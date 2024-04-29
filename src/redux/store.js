// store.js
import { createStore } from "redux";
import { employeeList } from "../datas/employees";

// Define reducer function
const initialState = { count: 0, time: Date.now(), employeeList };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    case "TIME":
      return {
        ...state,
        time: Date.now(),
      };
    case "EMPLOYEE_UPDATE":
      const { index, data } = action.payload;
      const updatedItems = [
        ...state.employeeList.slice(0, index),
        data,
        ...state.employeeList.slice(index + 1),
      ];
      return {
        ...state,
        employeeList: updatedItems,
      };
    default:
      return state;
  }
}

// Create Redux store
const store = createStore(counterReducer);

export default store;
