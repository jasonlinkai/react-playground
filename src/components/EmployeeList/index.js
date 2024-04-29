import { useSelector } from "react-redux";
import { Employee } from "./Employee";

export function EmployeeList() {
  console.log("EmployeeList rerendered!");
  const employeeList = useSelector((state) => state.employeeList);
  return (
    <>
      {employeeList.map((employee, index) => {
        return <Employee key={employee.id} index={index} {...employee} />;
      })}
    </>
  );
}
