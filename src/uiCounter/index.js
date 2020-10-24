import $ from 'jquery';
import { createUICounter } from './counter';

createUICounter($('#counter'), {
  initVal: 10,
  min: 8,
  max: 12
});
