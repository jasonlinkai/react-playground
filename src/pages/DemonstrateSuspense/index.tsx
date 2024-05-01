import { Suspense, useState } from "react";
import Loading from "../../components/Loading";
import { withSuspendPromise } from "../../utils/withSuspendPromise";
import { withCache } from "../../utils/withCache";
import { promiseService } from "../../utils/promiseService";

type ServiceType = string | undefined;
const AsyncComponent: React.FC = () => {
  console.log("AsyncComponent rendered!");
  const index = "test";

  // 想要執行的方法, 這邊我們用一個異步行為
  const computedFunc = () => promiseService.get<ServiceType>("test");

  // 將結果cache在某個索引上, 並自動註冊清除的秒數
  const willCachePromiseOrCachedValue = withCache<ServiceType>(
    index,
    computedFunc,
    6000
  );

  // 這邊會將拿到的值進行判斷，如果是拿到cache我們可以直接使用, 如果不是cache我們需要hack這個promise, 用來捕獲狀態讓react suspense感知
  const value = withSuspendPromise<ServiceType>(
    willCachePromiseOrCachedValue
  ).read();

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
