import '@testing-library/jest-dom/extend-expect';
import { getByText, fireEvent } from '@testing-library/dom';
import { createUICounter } from '../../src/uiCounter/counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('생성시 버튼과 초기값을 렌더링한다.', () => {

});

it('+ 버튼 클릭시 1 증가한다.', () => {

});

it('- 버튼 클릭시 1 감소한다.', () => {

});

it('Max값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.', () => {

});

it('Min값인 경우 - 버튼이 disabled 상태가 되며, 클릭해도 감소하지 않는다.', () => {

});
