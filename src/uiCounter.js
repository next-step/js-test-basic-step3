import createCounter from "./counter.js";

export function createUICounter(el, options) {
  const $el = document.querySelector(el);
  const counter = createCounter(options);

  const render = () => {
    const val = counter.val();
    const decDisabled = counter.isMin() ? "disabled" : "";
    const incDisabled = counter.isMax() ? "disabled" : "";

    $el.innerHTML = `
      <button type="button" ${decDisabled} class="btn btn-secondary btn-dec">-</button>
      <span class="value">${val}</span>
      <button type="button" ${incDisabled} class="btn btn-primary btn-inc">+</button>`;
  };

  const onClickHandler = (e) => {
    if (e.target.classList.contains("btn-inc")) {
      counter.inc();
      render();
      return;
    }
    if (e.target.classList.contains("btn-dec")) {
      counter.dec();
      render();
    }
  };

  const initEventListeners = () => {
    $el.addEventListener("click", onClickHandler);
  };

  render();
  initEventListeners();
}
