import "./index.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";

const ActionBar: React.FC = observer(() => {
  const { canUndo, canRedo, undoAst, redoAst, editor } = useStores();
  const {
    isLeftDrawerOpen,
    setIsLeftDrawerOpen,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
  } = editor;

  return (
    <div id="action-bar">
      <div>
        <button
          className="open-drawer-button"
          onClick={() => {
            setIsLeftDrawerOpen(!isLeftDrawerOpen);
          }}
        >
          {isLeftDrawerOpen ? "關閉風格編輯器" : "開啟風格編輯器"}
        </button>
        <button disabled={!canUndo} onClick={undoAst}>
          上一步
        </button>
        <button disabled={!canRedo} onClick={redoAst}>
          下一步
        </button>
      </div>
      <div>
        <button
          className="open-drawer-button"
          onClick={() => {
            setIsRightDrawerOpen(!isRightDrawerOpen);
          }}
        >
          {isRightDrawerOpen ? "關閉樹狀編輯器" : "開啟樹狀編輯器"}
        </button>
      </div>
    </div>
  );
});

export default ActionBar;
