import $ from 'jquery';
import { createCounter } from '../backup/counter';

export function createUICounter(el, options) {
  const $el = $(el);
  const counter = createCounter(options);

  function render() {
    const val = counter.val();
    const decDisabled = counter.isMin() ? 'disabled' : '';
    const incDisabled = counter.isMax() ? 'disabled' : '';

    $el.html(`
      <button type="button" ${decDisabled} class="btn btn-secondary btn-dec">-</button>
      <span class="value">${val}</span>
      <button type="button" ${incDisabled} class="btn btn-primary btn-inc">+</button>
    `);
  }

  render();

  $el.on('click', '.btn-inc', () => {
    counter.inc();
    render();
  });

  $el.on('click', '.btn-dec', () => {
    counter.dec();
    render();
  });
}
