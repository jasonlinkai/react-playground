import "./index.css";
import ActionBar from "./ActionBar";
import LeftDrawer from "./LeftDrawer";
import Renderer from "./Renderer";
import { MobxStateTreeStoreProvider } from "../../storages/mobx/MobxStateTreeProvider";

const WebEditor: React.FC = () => {
  return (
    <MobxStateTreeStoreProvider>
      <div id="web-editor">
        <ActionBar />
        <div style={{ display: "flex" }}>
          <LeftDrawer />
          <Renderer />
        </div>
      </div>
    </MobxStateTreeStoreProvider>
  );
};

export default WebEditor;
