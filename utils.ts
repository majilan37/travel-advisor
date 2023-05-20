type DebouncedFunction<T extends any[]> = (...args: T) => void;

export function debounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number
): DebouncedFunction<T> {
  let timerId: NodeJS.Timeout | null;
  console.log("debounced");
  return function (...args: T) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
      timerId = null;
    }, delay);
  };
}

export function _debounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number
): DebouncedFunction<T> {
  let timerId: NodeJS.Timeout | null;
  let shouldExecute = false;

  return function (...args: T) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      if (shouldExecute) {
        // @ts-ignore
        func.apply(this, args);
      }
      timerId = null;
      shouldExecute = false;
    }, delay);

    shouldExecute = true;
  };
}
