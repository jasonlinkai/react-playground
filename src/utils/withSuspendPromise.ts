enum PromiseStatus {
  PENDING,
  FULLFILLED,
}

export const withSuspendPromise = <T>(
  suspender: Promise<T>
): {
  read: () => T
} => {
  let status = PromiseStatus.PENDING;
  let result: T;
  suspender.then(
    (r) => {
      status = PromiseStatus.FULLFILLED;
      result = r;
    },
  );

  return {
    read: () => {
      if (status === PromiseStatus.PENDING) {
        throw suspender;
      } else {
        return result;
      }
    },
  };
};
