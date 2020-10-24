import '@testing-library/jest-dom/extend-expect';
import { getByText, fireEvent } from '@testing-library/dom';
import { createUICounter } from '../../src/uiCounter/counter';
import { createCounter } from '../../src/backup/counter';

jest.mock('../../src/backup/counter');

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('생성시 주어진 옵션으로 counter를 생성한다.', () => {
  createCounter.mockImplementation(() => ({
    val: () => 10,
    isMin: () => false,
    isMax: () => false
  }));

  const options = {
    initVal: 10,
    min: 8,
    max: 12
  };

  createUICounter(container, options);

  expect(createCounter).toHaveBeenCalledWith(options);
});

it('생성시 counter의 상태에 버튼과 초기값을 렌더링한다.', () => {
  createCounter.mockImplementation(() => ({
    val: () => 10,
    isMin: () => false,
    isMax: () => false
  }));
  createUICounter(container);

  expect(getByText(container, '+')).toBeVisible();
  expect(getByText(container, '-')).toBeVisible();
  expect(getByText(container, '10')).toBeVisible();
});

it('isMin/isMax 값이 true이면 -/+ 버튼은 disabled 상태가 된다.', () => {
  createCounter.mockImplementation(() => ({
    val: () => 10,
    isMin: () => true,
    isMax: () => true
  }));
  createUICounter(container);

  expect(getByText(container, '-')).toBeDisabled();
  expect(getByText(container, '+')).toBeDisabled();
});

it('+ 버튼 클릭시 counter의 inc()를 호출한 후 다시 렌더링한다.', () => {
  let value = 10;
  const counterInc = jest.fn().mockImplementation(() => {
    value = 11;
  });
  createCounter.mockImplementation(() => ({
    val: () => value,
    isMin: () => false,
    isMax: () => false,
    inc: counterInc
  }));

  createUICounter(container);

  fireEvent.click(getByText(container, '+'));
  expect(counterInc).toHaveBeenCalled();
  expect(getByText(container, '11')).toBeVisible();
});

it('- 버튼 클릭시 counter의 dec()를 호출한 후 다시 렌더링한다.', () => {
  let value = 10;
  const counterDec = jest.fn().mockImplementation(() => {
    value = 9;
  });
  createCounter.mockImplementation(() => ({
    val: () => value,
    isMin: () => false,
    isMax: () => false,
    dec: counterDec
  }));

  createUICounter(container);

  fireEvent.click(getByText(container, '-'));
  expect(counterDec).toHaveBeenCalled();
  expect(getByText(container, '9')).toBeVisible();
});
