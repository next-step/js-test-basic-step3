before(() => {
  cy.visit("http://127.0.0.1:8080");
});

describe("TodoList 테스트", () => {

  const baseURL = "https://js-todo-list-9ca3a.df.r.appspot.com/api";
  const teamText = "E2E-Test-Team";
  const memberText = "E2E-Member";
  const newTodoText = "E2E Todo Item";

  it("Team을 추가한다.", () => {
    cy.get("#add-team-button").click();
    cy.focused().type(teamText).type('{enter}');
    cy.contains(teamText).should("be.visible");
  });

  it("Team을 선택하여 이동한다.", () => {
    cy.intercept("GET", `${baseURL}/teams/**`).as("getTeam");
    cy.get(".team-list-container").contains(teamText).first().click();
    cy.wait("@getTeam");
    cy.get("#user-title strong").contains(teamText).should("be.visible");
    cy.get("#todo-list-of-team").children(".todoapp-container").should("have.length", 0);
  });

  it("Member를 추가한다.", () => {
    cy.intercept("POST", `${baseURL}/teams/**/members`).as("postMember");
    cy.get("#add-user-button").click();
    cy.focused().type(memberText).type('{enter}');
    cy.wait("@postMember");
    cy.get(".todoapp-container").should("have.length", 1);
  });

  it("todo list에 todoItem을 키보드로 입력후 enter키를 눌러 추가하기", () => {
    cy.get(".todoapp-container:eq(0)").as("container");
    cy.get("@container").find(".new-todo").type(newTodoText).type('{enter}');
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.wait("@getTodo");
    cy.get("@container").find(".todo-list li:eq(0)").contains(newTodoText).should("be.visible");
  });

  it("아이템 Filter 테스트", () => {
    cy.get(".todoapp-container:eq(0) .filters").as("filters");
    cy.get(".todoapp-container:eq(0) .todo-count strong").as("counter");
    cy.get("@filters").contains("해야할 일").click();
    cy.get("@counter").should("text", "1");
    cy.get("@filters").contains("완료한 일").click();
    cy.get("@counter").should("text", "0");
    cy.get("@filters").contains("전체보기").click();
    cy.get("@counter").should("text", "1");
  });

  it("todo list의 체크박스를 클릭하여 complete 상태로 변경.", () => {
    // li tag 에 completed class 추가, input 태그에 checked 속성 추가
    cy.get(".todoapp-container").first().get(".todo-list li").first().as("container");
    cy.get("@container").get(".toggle").first().click();
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.wait("@getTodo");
    cy.get("@container").should("have.class", "completed");
    cy.get("@container").get(".toggle").should("be.checked");

    cy.get("@container").get(".toggle").first().click();
    cy.wait("@getTodo");
    cy.get("@container").get(".toggle").should("not.be.checked");
  });

  it("todoItem의 갯수를 counting", () => {
    cy.get(".todoapp-container").first().as("container");
    cy.get("@container").get(".todo-count strong").should("text", "1");
  });

  it("todoItem을 수정", () => {
    cy.get(".todoapp-container:eq(0) .todo-list li:eq(0)").as("container");
    cy.get("@container").find("label").dblclick({ multiple: false });
    cy.get("@container").find("input.edit").focus().type(" update ", { force: true }).type('{enter}', { force: true });

    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.wait("@getTodo");
    cy.get("@container").find('label').contains("update").should("not.be.empty");
  });

  it("todoItem을 더블 클릭시 input 모드로 변경", () => {
    cy.get(".todoapp-container:eq(0) .todo-list li:eq(0)").as("container");
    cy.get("@container").find("label").dblclick();
    cy.get("@container").should("have.class", "editing");
    cy.get("@container").find("input.edit").focus().type(`{esc}`, { force: true });
    cy.get("@container").should("not.have.class", "editing");
  });

  it("todoItem을 삭제하기", () => {
    cy.get(".todoapp-container:eq(0) .todo-list li:eq(0)").as("container");
    cy.get("@container").find(".destroy").invoke('show').click();
    cy.intercept("GET", `${baseURL}/teams/**/members/**`).as("getTodo");
    cy.wait("@getTodo");
    cy.get(".todoapp-container:eq(0) .todo-count strong").should("text", "0");
  });

  it("team을 삭제하기", () => {
    cy.get("#user-title button").click();
  });
});
