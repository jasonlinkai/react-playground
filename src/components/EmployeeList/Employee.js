import { memo } from "react";
import { useDispatch } from "react-redux";
import { changeEmployeeName } from "../../datas/employees";

export const Employee = memo(({ index, ...rest }) => {
  const { id, firstName, lastName, email } = rest;
  const dispatch = useDispatch();
  console.log("Employee rerendered: ", id);
  return (
    <div
      onClick={() => {
        dispatch({
          type: "EMPLOYEE_UPDATE",
          payload: {
            index,
            data: {
              ...changeEmployeeName(rest),
            },
          },
        });
      }}
    >
      <div>
        name: {firstName} {lastName}
      </div>
      <div>email: {email}</div>
    </div>
  );
});
