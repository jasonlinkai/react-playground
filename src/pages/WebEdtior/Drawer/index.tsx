import "./drawer.css";
import { useState } from "react";
import type { AstElement } from "../RenderReactAst/ast";

interface DrawerProps {
  selectedAstElement: AstElement | null;
}
const Drawer: React.FC<DrawerProps> = ({
  selectedAstElement,
}) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={`side-drawer ${open ? "open" : ""}`}>
      {
        selectedAstElement !== null && (
          <nav className="drawer-navigation">
            <ul>
              <li>uuid: {selectedAstElement.uuid}</li>
              <li>parentUuid: {selectedAstElement.parentUuid}</li>
              <li>className: {selectedAstElement.props.className}</li>
              <li>style: {JSON.stringify(selectedAstElement.props.style)}</li>
            </ul>
          </nav>
        )
      }
      {/* 添加一个可以打开和关闭抽屉的按钮 */}
      <button className="open-drawer-button" onClick={toggleDrawer}>
        {open ? "Close Drawer" : "Open Drawer"}
      </button>
    </div>
  );
};

export default Drawer;
