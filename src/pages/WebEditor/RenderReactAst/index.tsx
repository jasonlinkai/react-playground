import "./renderer.css";
import clsx from "clsx";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { AstNodeType } from "../../../mobx/AstNode";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import { observer } from "mobx-react-lite";

//
// Define a function to recursively render AST nodes
//
interface RenderNodeProps {
  ast: AstNodeType | undefined;
  handleOnClick: (ev: React.MouseEvent, node: AstNodeType) => void;
  handleOnDragStart: (ev: React.DragEvent) => void;
  handleOnDragOver: (ev: React.DragEvent, node: AstNodeType) => void;
  handleOnDragLeave: (ev: React.DragEvent, node: AstNodeType) => void;
  handleOnDrop: (ev: React.DragEvent, node: AstNodeType) => void;
}

const RenderNode: React.FC<RenderNodeProps> = observer(({ ast, ...p }) => {
  if (!ast) return null;
  const { editor } = useStores();
  const {
    selectedAstNode,
    setSelectedAstNode,
    editingSelectedAstNode,
    setEditingSelectedAstNode,
  } = editor;
  const {
    handleOnClick,
    handleOnDragStart,
    handleOnDragOver,
    handleOnDragLeave,
    handleOnDrop,
  } = p;
  const isTextElement = ast.isPureTextNode;
  // Base case: If the node is a text node, render it as is
  if (isTextElement) {
    return ast.content;
  }

  const node: AstNodeType = ast;
  // Otherwise, it's an element node
  const { type, props, children } = node;
  const isRootElement = node.parent === "root";
  const isSelectedElement = false;
  const isDragOverAstElement = false;
  const draggable = !isRootElement && isSelectedElement;

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
        ...props.style,
        ...(isSelectedElement ? {} : {}), // 將編輯中的節點樣式覆蓋到畫面上 editingSelectedAstElement?.props.style
      },
      className: clsx([
        props.className,
        {
          "selected-element": isSelectedElement,
          "drag-over-element": isDragOverAstElement,
        },
      ]),
    },
    renderChildren.map((child) => {
      return <RenderNode key={child.uuid} ast={child} {...p} />;
    })
  );
});

const RenderReactAST: React.FC = observer(() => {
  const { ast, editor } = useStores();
  const { setSelectedAstNode, setEditingSelectedAstNode } = editor;
  const [dragOverAstElement, setDragOverAstElement] =
    useState<AstNodeType | null>(null);

  const handleOnClick: (ev: React.MouseEvent, node: AstNodeType) => void =
    useCallback((e, selected) => {
      e.stopPropagation();
      console.log('handleOnClick', selected);
      setSelectedAstNode(selected);
      setEditingSelectedAstNode(selected);
    }, [setSelectedAstNode, setEditingSelectedAstNode]);

  const handleOnDragStart: React.DragEventHandler = useCallback((ev) => {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("application/json", JSON.stringify({}));
  }, []);

  const handleOnDragOver: (ev: React.DragEvent, node: AstNodeType) => void =
    useCallback((ev, inAstElement) => {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
      setDragOverAstElement(null);
    }, []);

  const handleOnDragLeave: (ev: React.DragEvent, node: AstNodeType) => void =
    useCallback((ev, leaveAstElement) => {
      ev.preventDefault();
      setDragOverAstElement(null);
    }, []);

  const handleOnDrop: (ev: React.DragEvent, node: AstNodeType) => void =
    useCallback((ev, drop) => {
      // const data = ev.dataTransfer.getData("application/json");
      // const drag = JSON.parse(data);
      setDragOverAstElement(null);
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

export default RenderReactAST;
