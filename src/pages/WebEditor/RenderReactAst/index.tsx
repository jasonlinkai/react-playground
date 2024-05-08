import "./renderer.css";
import clsx from "clsx";
import React from "react";
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
}
const recursivlyRenderAstNode = ({
  ast,
  selectedAstElement,
  editingSelectedAstElement,
  setSelectedAstElement,
}: RecursivlyRenderAstNodeProps): JSX.Element | string => {
  const isTextElement = "innerType" in ast;
  // Base case: If the node is a text node, render it as is
  if (isTextElement) {
    return ast.content;
  }

  const node: AstElement = ast;
  // Otherwise, it's an element node
  const { uuid, type, props, children, events } = node;

  // Define event listeners if they exist in props
  // FIXME: type is not correct.
  const eventListeners: { [key: string]: (...args: any[]) => void } = {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedAstElement(node);
      events["onClick"] && dispatchEvent(events["onClick"]);
    }, // Example click event listener
  };

  // Render the element with event listeners
  const renderChildren = Array.isArray(children)
    ? children.map((child) =>
        recursivlyRenderAstNode({
          ast: child,
          selectedAstElement,
          editingSelectedAstElement,
          setSelectedAstElement,
        })
      )
    : children;

  const isSelectedElement =
    selectedAstElement && selectedAstElement.uuid === uuid;

  return React.createElement(
    type,
    {
      ...props,
      ...eventListeners,
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
  const { ast, selectedAstElement, editingSelectedAstElement, setSelectedAstElement } = useAst();
  console.log('selectedAstElement.uuid', selectedAstElement?.uuid, selectedAstElement?.props.style)
  console.log('editingSelectedAstElement.uuid', editingSelectedAstElement?.uuid, editingSelectedAstElement?.props.style)
  return (
    <div id="ast-renderer">
      {recursivlyRenderAstNode({
        ast,
        selectedAstElement,
        editingSelectedAstElement,
        setSelectedAstElement,
      })}
    </div>
  );
};

export default RenderReactAST;
