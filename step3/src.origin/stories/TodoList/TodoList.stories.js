import "./todoList.css";
import { action } from "@storybook/addon-actions";

export default {
  title: "UI/TodoList",
};

const todoListTemplates = {
  todoItem(value) {
    return `<li>
              <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${value}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit"/>
            </li>`;
  },
};

const Template = () => {
  const $todoApp = document.createElement("div");
  $todoApp.classList.add("todoapp");
  const $todoAppTemplate = `
      <h1>TODOS</h1>
      <input
        id="new-todo-title"
        class="new-todo"
        placeholder="할일을 추가해주세요"
        autofocus
      />
      <main>
        <input class="toggle-all" type="checkbox" />
        <ul id="todo-list" class="todo-list"></ul>
        <div class="count-container">
          <span class="todo-count">총 <strong>0</strong> 개</span>
          <ul class="filters">
            <li>
              <a class="all selected" href="#">전체보기</a>
            </li>
            <li>
              <a class="active" href="#active">해야할 일</a>
            </li>
            <li>
              <a class="completed" href="#completed">완료한 일</a>
            </li>
          </ul>
        </div>
      </main>
    `;
  $todoApp.innerHTML = $todoAppTemplate;
  $todoApp.addEventListener("keypress", (e) => {
    const $target = e.target;
    if ($target.classList.contains("new-todo") && e.key === "Enter") {
      action("keydown")(e, $target.value);
      document
        .querySelector("#todo-list")
        .insertAdjacentHTML(
          "beforeend",
          todoListTemplates.todoItem($target.value)
        );
    }
  });

  $todoApp.addEventListener("click", (e) => {
    const $target = e.target;
  });
  return $todoApp;
};

export const TodoList = Template.bind({});
