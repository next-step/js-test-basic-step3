import "./todoItem.css";

export default {
  title: "Comopnents/TodoList/TodoItem",
  argTypes: {
    children: { control: "text" },
  },
};

const Template = () => {
  const template = `<ul id="todo-list" class="todo-list">
          <li>
            <div class="view">
              <input class="toggle" type="checkbox"/>
              <label class="label">새로운 타이틀</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="새로운 타이틀" />
          </li>
          <li class="editing">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">완료된 타이틀</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="완료된 타이틀" />
          </li>
          <li class="completed">
            <div class="view">
              <input class="toggle" type="checkbox" checked/>
              <label class="label">완료된 타이틀</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="완료된 타이틀" />
          </li>
        </ul>`;
  return template;
};

export const TodoItem = Template.bind({});
