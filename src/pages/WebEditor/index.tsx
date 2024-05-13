import "./index.css";
import ActionBar from "./ActionBar";
import LeftDrawer from "./LeftDrawer";
import Renderer from "./Renderer";
import RightDrawer from "./RightDrawer";
import { MobxStateTreeStoreProvider } from "../../storages/mobx/MobxStateTreeProvider";

const WebEditor: React.FC = () => {
  return (
    <MobxStateTreeStoreProvider>
      <div id="web-editor">
        <ActionBar />
        <div className="web-editor__main-area">
          <LeftDrawer />
          <Renderer />
          <RightDrawer />
        </div>
      </div>
    </MobxStateTreeStoreProvider>
  );
};

export default WebEditor;
