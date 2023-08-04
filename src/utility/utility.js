export function debounce(func, delay) {
  let timerId;

  return function () {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
