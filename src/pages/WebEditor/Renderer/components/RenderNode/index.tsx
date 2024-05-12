import "./index.css";
import clsx from "clsx";
import React, { SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import { AstNodeModelType } from "../../../../../storages/mobx/AstNodeModel";

interface RenderNodeProps {
  ast: AstNodeModelType | undefined;
  handleOnClick: (ev: React.MouseEvent, node: AstNodeModelType) => void;
  handleOnDragStart: (ev: React.DragEvent) => void;
  handleOnDragOver: (ev: React.DragEvent, node: AstNodeModelType) => void;
  handleOnDragLeave: (ev: React.DragEvent, node: AstNodeModelType) => void;
  handleOnDrop: (ev: React.DragEvent, node: AstNodeModelType) => void;
}

const RenderNode: React.FC<RenderNodeProps> = observer(({ ast, ...p }) => {
  if (!ast) return null;
  const {
    handleOnClick,
    handleOnDragStart,
    handleOnDragOver,
    handleOnDragLeave,
    handleOnDrop,
  } = p;
  const isPureTextNode = ast.isPureTextNode;
  // Base case: If the node is a text node, render it as is
  if (isPureTextNode) {
    return ast.content;
  }

  const node: AstNodeModelType = ast;
  // Otherwise, it's an element node
  const { type, props, editingStyle, children } = node;
  const isRootNode = node.parent === "root";
  const isSelectedNode = false;
  const isDragOverNode = false;
  const draggable = !isRootNode && isSelectedNode;

  // register event for web-editor
  const editorEventListeners: {
    [key: string]: React.EventHandler<SyntheticEvent> | undefined;
  } = {};
  editorEventListeners.onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOnClick(e, node);
  };
  if (draggable) {
    editorEventListeners.onDragStart = (e: React.DragEvent) => {
      handleOnDragStart(e);
    };
  } else {
    editorEventListeners.onDragOver = (e: React.DragEvent) => {
      handleOnDragOver(e, node);
    };
    editorEventListeners.onDragLeave = (e: React.DragEvent) => {
      handleOnDragLeave(e, node);
    };
    editorEventListeners.onDrop = (e: React.DragEvent) => {
      handleOnDrop(e, node);
    };
  }

  // Render the element with event listeners
  const renderChildren = Array.isArray(children) ? children : [children];

  return React.createElement(
    type,
    {
      ...props,
      ...editorEventListeners,
      draggable,
      style: {
        ...{ ...props.style, ...editingStyle },
      },
      className: clsx([
        props.className,
        {
          "render-node": true,
          "selected-node": isSelectedNode,
          "drag-over-node": isDragOverNode,
        },
      ]),
    },
    renderChildren.map((child) => {
      return <RenderNode key={child.uuid} ast={child} {...p} />;
    })
  );
});

export default RenderNode;
