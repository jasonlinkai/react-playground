import "./index.css";
import { observer } from "mobx-react-lite";
import { AstNodeModelType } from "../../../../../../storages/mobx/AstNodeModel";
import { useStores } from "../../../../../../storages/mobx/useMobxStateTreeStores";

const AstTagTree = observer(
  ({ node, level = 0 }: { node: AstNodeModelType; level?: number }) => {
    const { editor } = useStores();
    const { setSelectedAstNode } = editor;
    const { isPureTextNode } = node;
    const marginLeft = `${10 * level}px`;
    return (
      <div
        key={`ast-tree-panel-item-${node.uuid}`}
        className="ast-tree-panel-item"
        style={{ marginLeft }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedAstNode(node);
        }}
      >
        {isPureTextNode ? (
          <span className="ast-tree-panel-item__content">{node.content}</span>
        ) : (
          <>
            <span className="ast-tree-panel-item__start-tag">{`<${node.type}>`}</span>
            {node.children.map((child) => {
              return <AstTagTree key={`ast-tree-panel-item-child-${child.uuid}`} node={child} level={level + 1} />;
            })}
            <span className="ast-tree-panel-item__end-tag">{`</${node.type}>`}</span>
          </>
        )}
      </div>
    );
  }
);

const AstTagTreePanel = ({ root }: { root: AstNodeModelType }) => {
  return (
    <div className="ast-tree-panel">
      <div className="ast-tree-panel__title">AstTagTreePanel</div>
      <AstTagTree node={root} />
    </div>
  );
};

export default AstTagTreePanel;
