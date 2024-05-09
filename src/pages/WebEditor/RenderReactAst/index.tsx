import "./renderer.css";
import clsx from "clsx";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { AstNode, AstElement } from "./ast";
import { useAst } from "../AstProvider";

//
// Define a function to recursively render AST nodes
//
interface RecursivlyRenderAstNodeProps {
  ast: AstNode;
  selectedAstElement: AstElement | null;
  editingSelectedAstElement: AstElement | null;
  setSelectedAstElement: (selected: AstElement) => void;
  handleOnClick: (ev: React.MouseEvent, node: AstElement) => void;
  handleOnDragStart: (ev: React.DragEvent) => void;
  handleOnDragOver: (ev: React.DragEvent) => void;
  handleOnDragLeave: (ev: React.DragEvent) => void;
  handleOnDrop: (ev: React.DragEvent, node: AstElement) => void;
  dragOverAstElement: AstElement | null;
  setDragOverAstElement: (dragOvered: AstElement) => void;
}
const recursivlyRenderAstNode = ({
  ast,
  selectedAstElement,
  editingSelectedAstElement,
  setSelectedAstElement,
  handleOnClick,
  handleOnDragStart,
  handleOnDragOver,
  handleOnDragLeave,
  handleOnDrop,
  dragOverAstElement,
  setDragOverAstElement,
}: RecursivlyRenderAstNodeProps): JSX.Element | string => {
  const isTextElement = "innerType" in ast;
  // Base case: If the node is a text node, render it as is
  if (isTextElement) {
    return ast.content;
  }

  const node: AstElement = ast;
  // Otherwise, it's an element node
  const { uuid, type, props, children } = node;
  const isSelectedElement =
    selectedAstElement && selectedAstElement.uuid === uuid;

  // register event for web-editor
  const editorEventListeners: {
    [key: string]: React.EventHandler<SyntheticEvent> | undefined;
  } = {};
  editorEventListeners.onClick = (e: React.MouseEvent) => {
    handleOnClick(e, node);
  };
  if (isSelectedElement) {
    editorEventListeners.onDragStart = (e: React.DragEvent) => {
      handleOnDragStart(e);
    };
  } else {
    editorEventListeners.onDragOver = (e: React.DragEvent) => {
      handleOnDragOver(e);
    };
    editorEventListeners.onDragLeave = (e: React.DragEvent) => {
      handleOnDragLeave(e);
    };
    editorEventListeners.onDrop = (e: React.DragEvent) => {
      handleOnDrop(e, node);
    };
  }

  // Render the element with event listeners
  const renderChildren = Array.isArray(children)
    ? children.map((child) =>
        recursivlyRenderAstNode({
          ast: child,
          selectedAstElement,
          editingSelectedAstElement,
          setSelectedAstElement,
          handleOnClick,
          handleOnDragStart,
          handleOnDragOver,
          handleOnDragLeave,
          handleOnDrop,
          dragOverAstElement,
          setDragOverAstElement,
        })
      )
    : children;

  return React.createElement(
    type,
    {
      ...props,
      ...editorEventListeners,
      draggable: isSelectedElement,
      style: {
        ...props.style,
        ...(isSelectedElement ? editingSelectedAstElement?.props.style : {}), // 將編輯中的節點樣式覆蓋到畫面上
      },
      className: clsx([
        props.className,
        {
          "selected-element": isSelectedElement,
        },
      ]),
    },
    renderChildren
  );
};

const RenderReactAST: React.FC = () => {
  const {
    ast,
    selectedAstElement,
    editingSelectedAstElement,
    setSelectedAstElement,
  } = useAst();
  const [dragOverAstElement, setDragOverAstElement] =
    useState<AstElement | null>(null);

  const handleOnClick: (ev: React.MouseEvent, node: AstElement) => void =
    useCallback(
      (e, selected) => {
        e.stopPropagation();
        setSelectedAstElement(selected);
      },
      [setSelectedAstElement]
    );

  const handleOnDragStart: React.DragEventHandler = useCallback(
    (ev) => {
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.setData(
        "application/json",
        JSON.stringify(selectedAstElement)
      );
    },
    [selectedAstElement]
  );

  const handleOnDragOver: React.DragEventHandler = useCallback((ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }, []);

  const handleOnDragLeave: React.DragEventHandler = useCallback((ev) => {
    ev.preventDefault();
  }, []);

  const handleOnDrop: (ev: React.DragEvent, node: AstElement) => void =
    useCallback((ev, drop) => {
      const data = ev.dataTransfer.getData("application/json");
      const drag = JSON.parse(data);
      console.log(`drag: ${JSON.stringify(drag)}`);
      console.log(`drop: ${JSON.stringify(drop)}`);
    }, []);

  return (
    <div id="ast-renderer">
      {recursivlyRenderAstNode({
        ast,
        selectedAstElement,
        editingSelectedAstElement,
        setSelectedAstElement,
        handleOnClick,
        handleOnDragStart,
        handleOnDragOver,
        handleOnDragLeave,
        handleOnDrop,
        dragOverAstElement,
        setDragOverAstElement,
      })}
    </div>
  );
};

export default RenderReactAST;
