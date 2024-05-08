import "./drawer.css";
import { useState } from "react";
import { useAst } from "../AstProvider";
import StyleEditor from "../StyleEditor";

const Drawer: React.FC = () => {
  const { selectedAstElement } = useAst();

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={`side-drawer ${open ? "open" : ""}`}>
      {selectedAstElement !== null && (
        <StyleEditor />
      )}
      {/* 添加一个可以打开和关闭抽屉的按钮 */}
      <button className="open-drawer-button" onClick={toggleDrawer}>
        {open ? "Close Drawer" : "Open Drawer"}
      </button>
    </div>
  );
};

export default Drawer;
