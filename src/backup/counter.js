module.exports.createCounter = function createCounter(options = {}) {
  let value = options.initVal || 0;
  const min = options.min || Number.NEGATIVE_INFINITY;
  const max = options.max || Number.POSITIVE_INFINITY;

  return {
    val() {
      return value;
    },
    inc() {
      if (max > value) {
        value += 1;
      }
    },
    dec() {
      if (min < value) {
        value -= 1;
      }
    },
    isMax() {
      return max === value;
    },
    isMin() {
      return min === value;
    }
  };
};
