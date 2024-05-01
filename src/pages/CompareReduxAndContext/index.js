import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Counter } from "../../components/Counter";
import { EmployeeList } from "../../components/EmployeeList";

function CompareReduxAndContext() {
  console.log('CompareReduxAndContext rerendered!')
  return (
    <>
        <Button></Button>
        <Input></Input>
        <Counter></Counter>
        <EmployeeList></EmployeeList>
    </>
  );
}

export default CompareReduxAndContext;
