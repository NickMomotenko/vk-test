export const debounce = (cb: Function, timeout = 1000) =>
  new Promise((resolve: Function) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timeout);
  });
