import "./renderer.css";
import clsx from "clsx";
import React, { SyntheticEvent } from "react";
import { dispatchEvent } from "../event";
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
  handleOnDragStart: (ev: React.DragEvent) => void;
  handleOnDragOver: (ev: React.DragEvent) => void;
  handleOnDrop: (ev: React.DragEvent, node: AstElement) => void;
}
const recursivlyRenderAstNode = ({
  ast,
  selectedAstElement,
  editingSelectedAstElement,
  setSelectedAstElement,
  handleOnDragStart,
  handleOnDragOver,
  handleOnDrop,
}: RecursivlyRenderAstNodeProps): JSX.Element | string => {
  const isTextElement = "innerType" in ast;
  // Base case: If the node is a text node, render it as is
  if (isTextElement) {
    return ast.content;
  }

  const node: AstElement = ast;
  // Otherwise, it's an element node
  const { uuid, type, props, children, events } = node;
  const isSelectedElement =
    selectedAstElement && selectedAstElement.uuid === uuid;

  // Define event listeners if they exist in props
  // FIXME: type is not correct.
  const eventListeners: {
    [key: string]: React.EventHandler<SyntheticEvent> | undefined;
  } = {
    // 註冊在全部元素上
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedAstElement(node);
      events["onClick"] && dispatchEvent(events["onClick"]);
    },
  };
  if (isSelectedElement) {
    eventListeners.onDragStart = (e: React.DragEvent) => {
      handleOnDragStart(e);
    };
  } else {
    eventListeners.onDragOver = (e: React.DragEvent) => {
      handleOnDragOver(e);
    };
    eventListeners.onDrop = (e: React.DragEvent) => {
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
          handleOnDragStart,
          handleOnDragOver,
          handleOnDrop,
        })
      )
    : children;

  return React.createElement(
    type,
    {
      ...props,
      ...eventListeners,
      draggable: isSelectedElement,
      style: {
        ...props.style,
        ...(isSelectedElement ? editingSelectedAstElement?.props.style : {}),
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
  const handleOnDragStart: React.DragEventHandler = (ev) => {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData(
      "application/json",
      JSON.stringify(selectedAstElement)
    );
  };
  const handleOnDragOver: React.DragEventHandler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };
  const handleOnDrop: (ev: React.DragEvent, node: AstElement) => void = (
    ev,
    drop
  ) => {
    const data = ev.dataTransfer.getData("application/json");
    const drag = JSON.parse(data);
    console.log(`drag: ${JSON.stringify(drag)}`);
    console.log(`drop: ${JSON.stringify(drop)}`);;
  };
  return (
    <div id="ast-renderer">
      {recursivlyRenderAstNode({
        ast,
        selectedAstElement,
        editingSelectedAstElement,
        setSelectedAstElement,
        handleOnDragStart,
        handleOnDragOver,
        handleOnDrop,
      })}
    </div>
  );
};

export default RenderReactAST;
