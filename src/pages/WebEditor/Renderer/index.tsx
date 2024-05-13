import "./index.css";
import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { AstNodeModelType } from "../../../storages/mobx/AstNodeModel";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";
import RenderNode from "./components/RenderNode";

const Renderer: React.FC = observer(() => {
  const { ast, editor } = useStores();
  const { setSelectedAstNode, dragingAstNode, setDragingAstNode } = editor;

  const handleOnClick: (ev: React.MouseEvent, node: AstNodeModelType) => void =
    useCallback(
      (e, node) => {
        e.stopPropagation();
        setSelectedAstNode(node);
      },
      [setSelectedAstNode]
    );

  const handleOnDragStart: (
    ev: React.DragEvent,
    node: AstNodeModelType
  ) => void = useCallback(
    (ev, node) => {
      ev.dataTransfer.effectAllowed = "move";
      setDragingAstNode(node);
    },
    [setDragingAstNode]
  );

  const handleOnDragOver: (
    ev: React.DragEvent,
    node: AstNodeModelType
  ) => void = useCallback((ev, node) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = "move";
    node.setIsDragOvered(true);
  }, []);

  const handleOnDragLeave: (
    ev: React.DragEvent,
    node: AstNodeModelType
  ) => void = useCallback((ev, node) => {
    ev.preventDefault();
    ev.stopPropagation();
    node.setIsDragOvered(false);
  }, []);

  const handleOnDrop: (ev: React.DragEvent, node: AstNodeModelType) => void =
    useCallback(
      (ev, node) => {
        ev.stopPropagation();
        if (dragingAstNode) {
          dragingAstNode.parent.removeChild(dragingAstNode, node);
          setDragingAstNode(undefined);
        }
      },
      [dragingAstNode, setDragingAstNode]
    );
  return (
    <div id="ast-renderer">
      <RenderNode
        ast={ast}
        handleOnClick={handleOnClick}
        handleOnDragStart={handleOnDragStart}
        handleOnDragOver={handleOnDragOver}
        handleOnDragLeave={handleOnDragLeave}
        handleOnDrop={handleOnDrop}
      />
    </div>
  );
});

export default Renderer;
