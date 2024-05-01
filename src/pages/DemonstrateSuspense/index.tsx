import { Suspense, useState } from "react";
import Loading from "../../components/Loading";
import { withSuspendPromise } from "../../utils/withSuspendPromise";
import { withCache } from "../../utils/withCache";
import { fakeApiService } from "../../utils/fakeApiService";

type ServiceType = string | undefined;

const anyFunc = () => fakeApiService.get<ServiceType>("/api/test-suspend");


const AsyncComponent: React.FC = () => {
  console.log("AsyncComponent rendered!");
  const index = "test";

  // 建立一個cache版本的方法, 自動將執行結果cache在某個索引上, 並自動註冊清除的秒數
  const cachedAnyFunc = withCache<ServiceType>(
    index,
    anyFunc,
    6000
  );

  const funcResult = cachedAnyFunc();

  // 假如沒有命中cache會拿到promise
  const isPromise = funcResult instanceof Promise;

  // 如果是拿到cache我們可以直接使用, 如果不是cache我們需要hack這個promise, 用來捕獲狀態讓react suspense感知
  const value = isPromise ? withSuspendPromise<ServiceType>(
    funcResult
  ).read() : funcResult;

  return <div>{value || "default"}</div>;
};

const DemonstrateSuspense: React.FC = () => {
  const [reload, setReload] = useState(Math.random());
  const toggleReload = () => {
    setReload(Math.random());
  };
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <AsyncComponent key={reload} />
      </Suspense>
      <button onClick={toggleReload}>reload</button>
    </div>
  );
};

export default DemonstrateSuspense;
