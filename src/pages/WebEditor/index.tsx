import "./webEditor.css";
import { AstProvider } from "./AstProvider";
import Drawer from "./Drawer";
import RenderReactAST from "./RenderReactAst";

const WebEditor: React.FC = () => {
  return (
    <AstProvider>
      <div id="web-editor">
        <Drawer />
        <RenderReactAST />
      </div>
    </AstProvider>
  );
};

export default WebEditor;
