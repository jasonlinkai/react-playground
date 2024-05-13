import { observer } from "mobx-react-lite";
import "./index.css";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";

const ActionBar: React.FC = observer(() => {
  const { canUndo, canRedo, undoAst, redoAst } = useStores();
  return (
    <div id="action-bar">
      <button disabled={!canUndo} onClick={undoAst}>上一步</button>
      <button disabled={!canRedo} onClick={redoAst}>下一步</button>
    </div>
  );
});

export default ActionBar;
