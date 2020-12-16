import "./todoHeader.css";
import { action } from "@storybook/addon-actions";

export default {
  title: "Comopnents/TodoList/TodoHeader",
  argTypes: {
    children: { control: "text" },
  },
};

const Template = ({ children }) => {
  const $todoAppContainer = document.createElement("div");
  $todoAppContainer.classList.add("todoapp");
  const $title = document.createElement("h1");
  $title.innerText = "TodoList";
  const $todoInput = document.createElement("input");
  $todoInput.value = children;
  $todoInput.classList.add("new-todo");
  $todoInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    action("엔터 입력 이벤트")(e);
  });
  $todoAppContainer.insertAdjacentElement("afterbegin", $title);
  $todoAppContainer.insertAdjacentElement("beforeend", $todoInput);
  return $todoAppContainer;
};

export const Header = Template.bind({});
Header.args = {
  children: "이곳에 Todo Item 입력",
};
