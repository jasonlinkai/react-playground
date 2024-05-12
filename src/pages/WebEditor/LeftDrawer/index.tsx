import "./index.css";
import { useState } from "react";
import StyleEditor from "./StyleEditor";

const LeftDrawer: React.FC = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={`left-drawer ${open ? "open" : ""}`}>
      <StyleEditor />
      <button className="open-drawer-button" onClick={toggleDrawer}>
        {open ? "Close Drawer" : "Open Drawer"}
      </button>
    </div>
  );
};

export default LeftDrawer;
