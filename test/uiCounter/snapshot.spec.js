import $ from 'jquery';
import { createUICounter } from '../../src/uiCounter/counter';

let $el;

beforeEach(() => {
  $el = $('<div>');
  $el.appendTo(document.body);

  createUICounter($el, {
    initVal: 10,
    min: 8,
    max: 12
  });
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('생성시 버튼과 초기값을 렌더링한다.', () => {
  expect($el.html()).toMatchSnapshot();
});

it('+ 버튼 클릭시 1 증가한다.', () => {
  $el.find('.btn-inc').click();

  expect($el.html()).toMatchSnapshot();
});

it('Max값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.', () => {
  $el.find('.btn-inc').click();
  $el.find('.btn-inc').click();
  $el.find('.btn-inc').click();

  expect($el.html()).toMatchSnapshot();
});

it('- 버튼 클릭시 1 감소한다.', () => {
  $el.find('.btn-dec').click();

  expect($el.html()).toMatchSnapshot();
});

it('Min값인 경우 - 버튼이 disabled 상태가 되며, 클릭해도 감소하지 않는다.', () => {
  $el.find('.btn-dec').click();
  $el.find('.btn-dec').click();
  $el.find('.btn-dec').click();

  expect($el.html()).toMatchSnapshot();
});
