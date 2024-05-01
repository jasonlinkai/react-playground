const GET_TIMEOUT_MILISECONDS = 2000;

type DataIndex = string;

interface Data {
  [index: DataIndex]: any;
}

const data: Data = {
  test: "test",
};

const get = <T>(index: DataIndex): Promise<T | undefined> => {
  console.log('get index:', index);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data[index]) {
        resolve(data[index] as T);
      } else {
        resolve(undefined);
      }
    }, GET_TIMEOUT_MILISECONDS);
  });
};

export const promiseService = {
  get,
};
