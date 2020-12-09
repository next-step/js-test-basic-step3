import { createUICounter } from './uiCounter';

export default function CounterApp() {
  createUICounter("#counter", {
    initVal: 10,
    min: 8,
    max: 12
  });
}

new CounterApp()
