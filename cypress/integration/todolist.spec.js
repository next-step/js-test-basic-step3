before(() => {
  cy.visit("http://127.0.0.1:8080");
});

describe("todolist 테스트", () => {
  it("todoItem을 추가한다", () => {
    const newTodoText = "새로운 할 일"
    cy.get("#new-todo-title").type(newTodoText).type('{enter}')
    cy.get("#todo-list li label").eq(0).should("text", newTodoText)
  });

  it("todoItem을 수정한다", () => {
    const updatedTodoText = "새로운 할 일 수정"
    cy.get("#todo-list li label").eq(0).dblclick()
    cy.focused().type(" 수정")
    cy.focused().type('{enter}')
    cy.get("#todo-list li label").eq(0).should("text", updatedTodoText)
  });

  it("todoItem을 완료한다.", () => {
    cy.get("#todo-list li input.toggle").eq(0).click()
    cy.get("#todo-list li").eq(0).should("have.class", "completed")
  });

  it("todoItem을 삭제한다", () => {
    cy.get("#todo-list li button.destroy").eq(0).click({ force: true })
  });
});
