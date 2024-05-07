import "./renderer.css"
import React from "react";

interface EditorProps {
  id: string;
}
// Define types for AST nodes
export interface AstElement extends EditorProps {
  type: string;
  props: { [key: string]: any };
  children: AstNode[];
}
export type AstText = string;
export type AstNode = AstElement | AstText;

// Define a function to recursively render AST nodes
interface RenderAstProps extends RenderReactASTProps {}
const renderAst = ({
  ast,
  setSelectedAstElement,
}: RenderAstProps): JSX.Element | string => {
  const node = ast;
  // Base case: If the node is a text node, render it as is
  if (typeof node === "string") {
    return node;
  }

  // Otherwise, it's an element node
  const { type, props, children } = node;

  // Define event listeners if they exist in props
  const eventListeners: { [key: string]: (...args: any[]) => void } = {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      console.log(node);
      setSelectedAstElement(node);
    }, // Example click event listener
  };
  for (const prop in props) {
    if (prop.startsWith("on")) {
      const eventName = prop.toLowerCase().substring(2);
      eventListeners[eventName] = props[prop];
    }
  }

  // Render the element with event listeners
  return React.createElement(
    type,
    { ...props, ...eventListeners },
    children.map((child) =>
      renderAst({
        ast: child,
        setSelectedAstElement,
      })
    )
  );
};


interface RenderReactASTProps {
  ast: AstNode;
  setSelectedAstElement: (selected: AstElement | null) => void;
}
const RenderReactAST: React.FC<RenderReactASTProps> = ({
  ast,
  setSelectedAstElement,
}) => {
  return (
    <div id="ast-renderer">
      {renderAst({
        ast,
        setSelectedAstElement,
      })}
    </div>
  );
};

export default RenderReactAST;
