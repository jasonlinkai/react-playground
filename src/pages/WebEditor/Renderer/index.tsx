import "./index.css";
import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { AstNodeModelType } from "../../../storages/mobx/AstNodeModel";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";
import RenderNode from "./components/RenderNode";
import { getSnapshot } from "mobx-state-tree";

const Renderer: React.FC = observer(() => {
  const { ast, editor } = useStores();
  const { setSelectedAstNode } = editor;

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
  ) => void = useCallback((ev, node) => {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("application/json", JSON.stringify(getSnapshot(node)));
  }, []);

  const handleOnDragOver: (
    ev: React.DragEvent,
    node: AstNodeModelType
  ) => void = useCallback((ev, node) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }, []);

  const handleOnDragLeave: (
    ev: React.DragEvent,
    node: AstNodeModelType
  ) => void = useCallback((ev, node) => {
    ev.preventDefault();
  }, []);

  const handleOnDrop: (ev: React.DragEvent, node: AstNodeModelType) => void =
    useCallback((ev, drop) => {
      const data = ev.dataTransfer.getData("application/json");
      console.log('drag', data);
      console.log('drop', JSON.stringify(getSnapshot(drop)));
    }, []);
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
