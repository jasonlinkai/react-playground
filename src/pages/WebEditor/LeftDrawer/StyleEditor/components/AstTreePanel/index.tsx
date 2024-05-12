import "./index.css";
import { Fragment } from "react";
import { AstNodeModelType } from "../../../../../../storages/mobx/AstNodeModel";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../../../../storages/mobx/useMobxStateTreeStores";

const AstTree = observer(
  ({ root, level = 0 }: { root: AstNodeModelType; level?: number }) => {
    const { editor } = useStores();
    const { setSelectedAstNode } = editor;
    return (
      <Fragment>
        {root.children.map((child) => {
          const { isPureTextNode } = child as AstNodeModelType;
          const marginLeft = `${10 * level}px`;
          return (
            <div
              key={`ast-tree-panel-item-${child.uuid}`}
              className="ast-tree-panel-item"
              style={{ marginLeft }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAstNode(child);
              }}
            >
              {isPureTextNode ? (
                <span className="ast-tree-panel-item__content">
                  {child.content}
                </span>
              ) : (
                <>
                  <span className="ast-tree-panel-item__start-tag">{`<${child.type}>`}</span>
                  <AstTree root={child} level={level + 1} />
                  <span className="ast-tree-panel-item__end-tag">{`</${child.type}>`}</span>
                </>
              )}
            </div>
          );
        })}
      </Fragment>
    );
  }
);

const AstTreePanel = ({ root }: { root: AstNodeModelType }) => {
  return (
    <div className="ast-tree-panel">
      <div className="ast-tree-panel__title">AstTreePanel</div>
      <AstTree root={root} />
    </div>
  );
};

export default AstTreePanel;
