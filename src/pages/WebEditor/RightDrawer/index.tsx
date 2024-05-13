import "./index.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";
import AstTagTreePanel from "./AstTagTreePanel";

const RightDrawer: React.FC = observer(() => {
  const { editor } = useStores();

  return (
    <div className={`right-drawer ${editor.isRightDrawerOpen ? "open" : ""}`}>
      <AstTagTreePanel />
    </div>
  );
});

export default RightDrawer;
