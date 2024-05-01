enum PromiseStatus {
  PENDING,
  ERROR,
  FULLFILLED,
}

export const withSuspendPromise = <T>(
  suspender: T | Promise<T>
): {
  read: () => T
} => {
  let status = PromiseStatus.PENDING;
  let result: T;
  let error: Error;

  const isSync = !(suspender instanceof Promise);
  if (isSync) {
    status = PromiseStatus.FULLFILLED;
    result = suspender;    
  } else {
    suspender.then(
      (r) => {
        status = PromiseStatus.FULLFILLED;
        result = r;
      },
      (e: Error) => {
        console.log('error1');
        status = PromiseStatus.ERROR;
        error = e;
      }
    );
  }

  return {
    read: () => {
      if (status === PromiseStatus.PENDING) {
        throw suspender;
      } else if (status === PromiseStatus.ERROR) {
        console.log('error?');
        throw error;
      } else if (status === PromiseStatus.FULLFILLED) {
        return result;
      } else {
        return result;
      }
    },
  };
};
