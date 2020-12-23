before(() => {
  cy.visit("http://127.0.0.1:8080");
});

describe("TodoList E2E테스트", () => {
  it("todo list에 todoItem을 키보드로 입력후 enter키를 눌러 추가한다", () => {
    const newTodoItem = "test";
    cy.get(".new-todo").type(`${newTodoItem}{enter}`);
    cy.get(".label").eq(-1).should("text", newTodoItem);
  });

  // (li tag 에 completed class 추가, input 태그에 checked 속성 추가)
  it("todo list의 체크박스를 클릭하여 complete 상태로 변경한다", () => {
    cy.get("#todo-list li .toggle").eq(-1).click();
    cy.get("#todo-list li").eq(-1).should("have.class", "completed");
    // cy.get("#todo-list li .toggle").eq(-1).should("have.attr", "checked");
  });

  //(li tag 에 editing class 추가)
  // 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
  it("todo list를 더블클릭했을 때 input 모드로 변경한다", () => {
    cy.get(".label").eq(-1).dblclick();
    cy.get(".editing").eq(-1).should("exist");
    cy.get(".edit").eq(-1).type("{esc}", { force: true });
    cy.get("#todo-list li").eq(-1).should("not.have.class", "editing");
  });

  it("todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제한다", () => {
    cy.get("button.destroy").eq(-1).click({ force: true }).should("not.exist");
  });

  it("todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기", () => {
    cy.get(".todo-count strong").should("text", 0);
    cy.get(".new-todo").type(`count test{enter}`);
    cy.get(".todo-count strong").should("text", 1);
    cy.get("button.destroy").eq(-1).click({ force: true }).should("not.exist");
  });

  it("해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기", () => {
    const text = "FILTER TEST";
    cy.get(".new-todo").type(`${text}{enter}`);
    cy.get(".filters li a").eq(1).click({ force: true });
    cy.contains(text).should("exist");
    cy.get(".filters li a").eq(2).click({ force: true });
    cy.contains(text).should("not.exist");

    cy.get(".filters li a").eq(0).click({ force: true });
    cy.get("li .toggle").click({ force: true });
    cy.get(".filters li a").eq(1).click({ force: true });
    cy.contains(text).should("not.exist");
    cy.get(".filters li a").eq(2).click({ force: true });
    cy.contains(text).should("exist");
  });
});
