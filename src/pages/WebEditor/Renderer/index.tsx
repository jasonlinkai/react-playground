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
  const selectedAstNode = editor.selectedAstNode as AstNodeModelType;

  const handleOnClick: (ev: React.MouseEvent, node: AstNodeModelType) => void =
    useCallback(
      (e, selected) => {
        e.stopPropagation();
        if (!selectedAstNode) {
          console.log("he");
          setSelectedAstNode(selected);
          selected.setEditingStyle(selected.props.style);
        } else {
          if (selected.uuid !== selectedAstNode.uuid) {
            console.log("in", "selected", selected.props.style);
            selectedAstNode.setEditingStyle({});
            setSelectedAstNode(selected);
            selected.setEditingStyle(getSnapshot(selected.props.style));
          } else {
            console.log("out");
          }
        }
      },
      [selectedAstNode, setSelectedAstNode]
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
      const drag = JSON.parse(data);
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
