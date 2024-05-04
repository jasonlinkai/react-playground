import { Suspense, useState } from "react";
import Loading from "../../components/Loading";
import { throwPromiseOrReturnCache } from "../../utils/throwPromiseOrReturnCache";
import { withCache } from "../../utils/withCache";
import { fakeApiService } from "../../utils/fakeApiService";

type ServiceType = string | undefined;

const anyFunc = () => fakeApiService.get<ServiceType>("/api/test-suspend");

const index = "test";
// 建立一個cache版本的方法, 自動將執行結果cache在某個索引上, 並自動註冊清除的秒數
const cachedAnyFunc = withCache<ServiceType>(
  index,
  anyFunc,
  6000
);

const AsyncComponent: React.FC = () => {
  console.log("AsyncComponent rendered!");
  // 執行cache版本的方法，如果此索引有cache過的值，且未被清除，則返回cached，反之返回promise。
  const funcResult = cachedAnyFunc();
  // 拋出promise或返回cache值，這邊是為了讓react component能識別是否需要進入suspend。
  const value = throwPromiseOrReturnCache(funcResult);

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
