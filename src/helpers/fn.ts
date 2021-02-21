export const noop = () => {};

export const debounce = (fn: (...args: any[]) => void, interval: number) => {
  let timer: NodeJS.Timeout | null = null;

  return function Foo(...args: any[]) {
    const ctx = typeof Foo;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, interval);
  };
};
