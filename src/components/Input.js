import { useThemeContext } from "../contexts/ThemeContext";
import { useSelector, useDispatch } from "react-redux";

export const Input = () => {
  const time = useSelector((state) => state.time);
  const dispatch = useDispatch();
  useThemeContext();
  console.log("Input rerendered!");
  return (
    <div onClick={() => dispatch({ type: 'TIME'})}>
      label: {time} <input></input>
    </div>
  );
};
