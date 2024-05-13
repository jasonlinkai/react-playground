import "./index.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

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
      <div className="left-area">
        {isLeftDrawerOpen ? (
          <FaAngleDoubleLeft
            onClick={() => {
              setIsLeftDrawerOpen(!isLeftDrawerOpen);
            }}
          />
        ) : (
          <FaAngleDoubleRight
            onClick={() => {
              setIsLeftDrawerOpen(!isLeftDrawerOpen);
            }}
          />
        )}
        <FaArrowLeft
          onClick={canUndo ? undoAst : undefined}
          color={canUndo ? "#333" : "#aaa"}
        />
        <FaArrowRight
          onClick={canRedo ? redoAst : undefined}
          color={canUndo ? "#333" : "#aaa"}
        />
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
