import "./index.css";
import StyleEditor from "./StyleEditor";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";

const LeftDrawer: React.FC = observer(() => {
  const { editor } = useStores();

  return (
    <div className={`left-drawer ${editor.isLeftDrawerOpen ? "open" : ""}`}>
      <StyleEditor />
    </div>
  );
});

export default LeftDrawer;
