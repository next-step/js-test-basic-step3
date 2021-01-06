import "./todoCounter.css";

export default {
  title: "Comopnents/TodoList/TodoCounter",
};

const Template = () =>
  `<div class="count-container">
      <span class="todo-count">총 <strong>0</strong> 개</span>
      <ul class="filters">
        <li>
          <a class="all selected" href="">전체보기</a>
        </li>
        <li>
          <a class="active" href="">해야할 일</a>
        </li>
        <li>
          <a class="completed" href="">완료한 일</a>
        </li>
      </ul>
    </div>`;

export const TodoCounter = Template.bind({});
