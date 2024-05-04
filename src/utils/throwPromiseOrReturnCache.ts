export const throwPromiseOrReturnCache = <T>(suspender: T | Promise<T>): T => {
  if (suspender instanceof Promise) {
    throw suspender;
  } else {
    return suspender;
  }
};
