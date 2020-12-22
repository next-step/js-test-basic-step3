const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/teams";

describe("todolist 테스트", () => {
  const teamname = "read1more의 팀";
  const username = "read1more";
  const newTodo = "새로운 todo";
  const todoCount = 3;

  beforeEach(() => {
    cy.intercept({
      method: /POST|PUT|DELETE/,
      url: /^https:\/\/blackcoffee-todolist\.df\.r\.appspot\.com\/api\/teams/,
    }).as("teamAPI");
  });

  it("페이지 로드", () => {
    cy.visit("/");
  });

  it("팀을 추가한다", () => {
    cy.window().then((window) => {
      cy.stub(window, "prompt").returns(teamname);
      cy.get("#add-team-button").click();
      cy.contains(teamname);
    });
  });

  it("추가한 팀 페이지 로드", () => {
    const card = cy.contains(".team-card-container", teamname);
    card.invoke("attr", "data-team-id").then((id) => {
      cy.contains(".team-card-container", teamname).click();
      cy.url().should("include", `team-id=${id}`);
    });
  });

  it("팀 멤버 추가", () => {
    cy.window().then((window) => {
      cy.stub(window, "prompt").returns(username);
      cy.get("#add-user-button").click();
      cy.wait("@teamAPI");
      cy.contains(username);
    });
  });

  it("추가한 멤버에 todolist 추가", () => {
    for (let i = 1; i <= todoCount; i++) {
      cy.get(".new-todo").type(`${newTodo}${i}{enter}`);
      cy.wait("@teamAPI");
    }

    cy.get(".todo-list-item").should("have.length", todoCount);
  });

  it("TodoItem 체크박스 클릭하여 complete 상태로 변경", () => {
    cy.get(".todo-list-item")
      .eq(1)
      .children(".view")
      .children(".toggle")
      .click();

    cy.wait("@teamAPI");
    cy.get(".todo-list-item").eq(1).should("have.class", "completed");
  });

  it("TodoItem 내용 변경 취소", () => {
    cy.get(".todo-list-item").eq(2).dblclick();
    cy.get(`input[value="${newTodo}${3}"]`).type("변경되지 않을내용{esc}");
    cy.get(`input[value="${newTodo}${3}"]`);
  });

  it("TodoItem 우선순위 1순위로 변경", () => {
    cy.get(".chip-container")
      .eq(0)
      .children("select")
      .select("1", { force: true });

    cy.wait("@teamAPI");
    cy.get(".chip").eq(0).should("have.class", "primary");
  });

  it("TodoItem 우선순위 2순위로 변경", () => {
    cy.get(".chip-container")
      .eq(0)
      .children("select")
      .select("2", { force: true });

    cy.wait("@teamAPI");
    cy.get(".chip").eq(0).should("have.class", "secondary");
  });

  it("TodoItem 우선순위 초기화", () => {
    cy.get(".chip-container")
      .eq(0)
      .children("select")
      .select("0", { force: true });

    cy.wait("@teamAPI");
    cy.get(".chip").eq(0).should("have.class", "select");
  });

  it("TodoItem 내용 변경", () => {
    const addedTodo = "추가내용";
    cy.get(".todo-list-item").eq(2).dblclick();
    cy.get(`input[value="${newTodo}${3}"]`).type(`${addedTodo}{enter}`);

    cy.wait("@teamAPI");
    cy.get(`input[value="${newTodo}${3}${addedTodo}"]`);
    cy.get(`input[value="${newTodo}${3}"]`).should("not.exist");
  });

  it("TodoItem 개수", () => {
    cy.get(".todo-count strong").should("have.text", todoCount);
  });

  it("해야할 일 필터", () => {
    cy.get("[data-filter='active']").click();
    cy.get(".todo-list-item").each((item) =>
      cy.wrap(item).should("not.have.class", "completed")
    );
  });

  it("완료한 일 필터", () => {
    cy.get("[data-filter='completed']").click();
    cy.get(".todo-list-item").each((item) =>
      cy.wrap(item).should("have.class", "completed")
    );
  });

  it("TodoItem x버튼으로 삭제", () => {
    cy.get(".todo-list-item")
      .eq(0)
      .children(".view")
      .children(".destroy")
      .click({ force: true });
    cy.wait("@teamAPI");
  });

  it("TodoItem 모두 삭제", () => {
    cy.get(".clear-completed").click();
    cy.get(".todo-count strong").should("have.text", 0);
    cy.wait("@teamAPI");
  });

  it("팀을 삭제한다", () => {
    cy.visit("/");
    const card = cy.contains(teamname);
    card.children(".delete-team").click();
    card.should("not.exist");
  });
});
