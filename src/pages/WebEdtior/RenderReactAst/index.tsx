import "./renderer.css";
import React from "react";
import { dispatchEvent } from "../event";
import { AstNode, AstElement } from "./ast";

//
// Define a function to recursively render AST nodes
//
interface RecursivlyRenderAstNodeProps {
  ast: AstNode;
  setSelectedAstElement: (selected: AstElement | null) => void;
}
const recursivlyRenderAstNode = ({
  ast,
  setSelectedAstElement,
}: RecursivlyRenderAstNodeProps): JSX.Element | string => {
  const isTextElement = "innerType" in ast;
  // Base case: If the node is a text node, render it as is
  if (isTextElement) {
    return ast.content;
  }

  const node: AstElement = ast;
  // Otherwise, it's an element node
  const { type, props, children, events } = node;

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
          setSelectedAstElement,
        })
      )
    : children;

  return React.createElement(
    type,
    { ...props, ...eventListeners },
    renderChildren
  );
};


interface RenderReactASTProps {
  ast: AstElement;
  setSelectedAstElement: (selected: AstElement | null) => void;
}
const RenderReactAST: React.FC<RenderReactASTProps> = ({
  ast,
  setSelectedAstElement,
}) => {
  return (
    <div id="ast-renderer">
      {recursivlyRenderAstNode({
        ast,
        setSelectedAstElement,
      })}
    </div>
  );
};

export default RenderReactAST;
