import { observer } from "mobx-react-lite";
import "./index.css";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";

const ActionBar: React.FC = observer(() => {
  const { canUndo, canRedo, undoAst, redoAst, editor } = useStores();
  const { isLeftDrawerOpen, setIsLeftDrawerOpen } = editor;

  const toggleDrawer = () => {
    setIsLeftDrawerOpen(!isLeftDrawerOpen);
  };

  return (
    <div id="action-bar">
      <button className="open-drawer-button" onClick={toggleDrawer}>
        {isLeftDrawerOpen ? "關閉風格編輯器" : "開啟風格編輯器"}
      </button>
      <button disabled={!canUndo} onClick={undoAst}>
        上一步
      </button>
      <button disabled={!canRedo} onClick={redoAst}>
        下一步
      </button>
    </div>
  );
});

export default ActionBar;
