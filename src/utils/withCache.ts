const CACHE_TIMEOUT_MILISECONDS = 5000;

type CacheKey = string;
interface Cache {
  [index: CacheKey]: any;
}
interface CacheTimeouts {
  [index: CacheKey]: any;
}

const cache: Cache = {};
const cacheTimeouts: CacheTimeouts = {};

// 使用index進行索引，並將computeFunc的結果保存，同時設定清除緩存的timeout
export const withCache = <T>(
  index: CacheKey,
  computeFunc: () => T | Promise<T>,
  cacheMiliseconds: number = CACHE_TIMEOUT_MILISECONDS
): (() => T | Promise<T>) => {
  return () => {
    if (cache.hasOwnProperty(index)) {
      console.log("is match cache");
      return cache[index] as T;
    } else {
      console.log("isn't match cache");
      return Promise.resolve(computeFunc()).then((value) => {
        console.log("resolved value: ", value);
        cache[index] = value;
        cacheTimeouts[index] = setTimeout(() => {
          delete cache[index];
          console.log("clear cache at index: ", index);
        }, cacheMiliseconds);
        return value;
      });
    }
  };
};
