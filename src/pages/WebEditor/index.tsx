import "./index.css";
import LeftDrawer from "./LeftDrawer";
import Renderer from "./Renderer";
import { MobxStateTreeStoreProvider } from "../../storages/mobx/MobxStateTreeProvider";

const WebEditor: React.FC = () => {
  return (
    <MobxStateTreeStoreProvider>
      <div id="web-editor">
        <LeftDrawer />
        <Renderer />
      </div>
    </MobxStateTreeStoreProvider>
  );
};

export default WebEditor;
