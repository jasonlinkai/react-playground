const GET_TIMEOUT_MILISECONDS = 2000;

type DataIndex = string;

interface Data {
  [index: DataIndex]: any;
}

const data: Data = {
  "/api/test-suspend": "test-suspend",
};

const get = <T>(index: DataIndex): Promise<T | undefined> => {
  console.log("get index:", index);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data[index] as T);
    }, GET_TIMEOUT_MILISECONDS);
  });
};

export const fakeApiService = {
  get,
};
