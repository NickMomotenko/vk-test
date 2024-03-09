export const debounce = (cb: Function, timeout = 1000) =>
  new Promise((resolve: any) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timeout);
  });
