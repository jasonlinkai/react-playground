import "./index.css";
import React, { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { AstNodeModelType } from "../../../storages/mobx/AstNodeModel";
import { useStores } from "../../../storages/mobx/useMobxStateTreeStores";
import RenderNode from "./components/RenderNode";

const Renderer: React.FC = observer(() => {
  const { ast, editor } = useStores();
  const { setSelectedAstNode } = editor;
  const selectedAstNode = (editor.selectedAstNode as AstNodeModelType);
  const [dragOverAstNode, setDragOverAstNode] =
    useState<AstNodeModelType | null>(null);

  const handleOnClick: (ev: React.MouseEvent, node: AstNodeModelType) => void =
    useCallback((e, selected) => {
      e.stopPropagation();
      if (!selectedAstNode) {
        console.log('he');
        setSelectedAstNode(selected);
        selected.setEditingStyle(selected.props.style);
      } else {
        if (selected.uuid !== selectedAstNode.uuid) {
          console.log('in', 'selected', selected.props.style);
          selectedAstNode.setEditingStyle({});
          setSelectedAstNode(selected);
          selected.setEditingStyle(selected.props.style);
        } else {
          console.log('out');
        }
      }
    }, [selectedAstNode, setSelectedAstNode]);

  const handleOnDragStart: React.DragEventHandler = useCallback((ev) => {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("application/json", JSON.stringify({}));
  }, []);

  const handleOnDragOver: (ev: React.DragEvent, node: AstNodeModelType) => void =
    useCallback((ev, inAstElement) => {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
      setDragOverAstNode(null);
    }, []);

  const handleOnDragLeave: (ev: React.DragEvent, node: AstNodeModelType) => void =
    useCallback((ev, leaveAstElement) => {
      ev.preventDefault();
      setDragOverAstNode(null);
    }, []);

  const handleOnDrop: (ev: React.DragEvent, node: AstNodeModelType) => void =
    useCallback((ev, drop) => {
      // const data = ev.dataTransfer.getData("application/json");
      // const drag = JSON.parse(data);
      setDragOverAstNode(null);
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
