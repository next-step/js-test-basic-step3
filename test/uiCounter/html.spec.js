import $ from 'jquery';
import prettyHTML from 'diffable-html';
import { createUICounter } from '../../src/uiCounter/counter';

let $container;

beforeEach(() => {
  $container = $('<div>');
  $container.appendTo(document.body);

  createUICounter($container, {
    initVal: 10,
    min: 8,
    max: 12
  });
});

it('생성시 버튼과 초기값을 렌더링한다.', () => {
  expect(prettyHTML($container.html())).toBe(
    prettyHTML(`
    <button type="button" class="btn btn-secondary btn-dec">-</button>
    <span class="value">10</span>
    <button type="button" class="btn btn-primary btn-inc">+</button>
  `)
  );
});

it('+ 버튼 클릭시 1 증가한다.', () => {
  $container.find('.btn-inc').click();

  expect(prettyHTML($container.html())).toBe(
    prettyHTML(`
    <button type="button" class="btn btn-secondary btn-dec">-</button>
    <span class="value">11</span>
    <button type="button" class="btn btn-primary btn-inc">+</button>
  `)
  );
});

it('Max값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.', () => {
  $container.find('.btn-inc').click();
  $container.find('.btn-inc').click();
  $container.find('.btn-inc').click();

  expect(prettyHTML($container.html())).toBe(
    prettyHTML(`
    <button type="button" class="btn btn-secondary btn-dec">-</button>
    <span class="value">12</span>
    <button type="button" disabled class="btn btn-primary btn-inc">+</button>
  `)
  );
});

it('- 버튼 클릭시 1 감소한다.', () => {
  $container.find('.btn-dec').click();

  expect(prettyHTML($container.html())).toBe(
    prettyHTML(`
    <button type="button" class="btn btn-secondary btn-dec">-</button>
    <span class="value">9</span>
    <button type="button" class="btn btn-primary btn-inc">+</button>
  `)
  );
});

it('Min값인 경우 - 버튼이 disabled 상태가 되며, 클릭해도 감소하지 않는다.', () => {
  $container.find('.btn-dec').click();
  $container.find('.btn-dec').click();
  $container.find('.btn-dec').click();

  expect(prettyHTML($container.html())).toBe(
    prettyHTML(`
    <button type="button" disabled class="btn btn-secondary btn-dec">-</button>
    <span class="value">8</span>
    <button type="button" class="btn btn-primary btn-inc">+</button>
  `)
  );
});
