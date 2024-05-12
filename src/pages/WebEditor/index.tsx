import "./index.css";
import LeftDrawer from "./LeftDrawer";
import RenderReactAST from "./Renderer";
import { MobxStateTreeStoreProvider } from "../../storages/mobx/MobxStateTreeProvider";

const WebEditor: React.FC = () => {
  return (
    <MobxStateTreeStoreProvider>
      <div id="web-editor">
        <LeftDrawer />
        <RenderReactAST />
      </div>
    </MobxStateTreeStoreProvider>
  );
};

export default WebEditor;
