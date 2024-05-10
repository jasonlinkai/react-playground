import "./webEditor.css";
import { AstProvider } from "./AstProvider";
import Drawer from "./Drawer";
import RenderReactAST from "./RenderReactAst";
import { MobxStateTreeStoreProvider } from "../../mobx/MobxStateTreeProvider";

const WebEditor: React.FC = () => {
  return (
    <MobxStateTreeStoreProvider>
      <AstProvider>
        <div id="web-editor">
          <Drawer />
          <RenderReactAST />
        </div>
      </AstProvider>
    </MobxStateTreeStoreProvider>
  );
};

export default WebEditor;
