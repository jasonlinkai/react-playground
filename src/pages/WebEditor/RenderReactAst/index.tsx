import "./renderer.css";
import clsx from "clsx";
import React, { SyntheticEvent, memo, useCallback, useState } from "react";
import { AstNode, AstElement } from "./ast";
import { useAst } from "../AstProvider";

//
// Define a function to recursively render AST nodes
//
interface RecursivlyRenderAstNodeProps {
  ast: AstNode;
  selectedAstElement: AstElement | null;
  editingSelectedAstElement: AstElement | null;
  dragOverAstElement: AstElement | null;
  handleOnClick: (ev: React.MouseEvent, node: AstElement) => void;
  handleOnDragStart: (ev: React.DragEvent) => void;
  handleOnDragOver: (ev: React.DragEvent, node: AstElement) => void;
  handleOnDragLeave: (ev: React.DragEvent, node: AstElement) => void;
  handleOnDrop: (ev: React.DragEvent, node: AstElement) => void;
}
// const recursivlyRenderAstNode = ({
//   ast,
//   selectedAstElement,
//   editingSelectedAstElement,
//   dragOverAstElement,
//   handleOnClick,
//   handleOnDragStart,
//   handleOnDragOver,
//   handleOnDragLeave,
//   handleOnDrop,
// }: RecursivlyRenderAstNodeProps): JSX.Element | string => {
//   const isTextElement = "innerType" in ast;
//   // Base case: If the node is a text node, render it as is
//   if (isTextElement) {
//     return ast.content;
//   }

//   const node: AstElement = ast;
//   // Otherwise, it's an element node
//   const { uuid, type, props, children } = node;
//   const isRootElement = node.parentUuid === "root";
//   const isSelectedElement =
//     selectedAstElement && selectedAstElement.uuid === uuid;
//   const isDragOverAstElement =
//     dragOverAstElement && dragOverAstElement.uuid === node.uuid;
//   const draggable = !isRootElement && isSelectedElement;

//   // register event for web-editor
//   const editorEventListeners: {
//     [key: string]: React.EventHandler<SyntheticEvent> | undefined;
//   } = {};
//   editorEventListeners.onClick = (e: React.MouseEvent) => {
//     handleOnClick(e, node);
//   };
//   if (draggable) {
//     editorEventListeners.onDragStart = (e: React.DragEvent) => {
//       handleOnDragStart(e);
//     };
//   } else {
//     editorEventListeners.onDragOver = (e: React.DragEvent) => {
//       handleOnDragOver(e, node);
//     };
//     editorEventListeners.onDragLeave = (e: React.DragEvent) => {
//       handleOnDragLeave(e, node);
//     };
//     editorEventListeners.onDrop = (e: React.DragEvent) => {
//       handleOnDrop(e, node);
//     };
//   }

//   // Render the element with event listeners
//   const renderChildren = Array.isArray(children)
//     ? children.map((child) =>
//         recursivlyRenderAstNode({
//           ast: child,
//           selectedAstElement,
//           editingSelectedAstElement,
//           dragOverAstElement,
//           handleOnClick,
//           handleOnDragStart,
//           handleOnDragOver,
//           handleOnDragLeave,
//           handleOnDrop,
//         })
//       )
//     : children;

//   return React.createElement(
//     type,
//     {
//       ...props,
//       ...editorEventListeners,
//       draggable,
//       style: {
//         ...props.style,
//         ...(isSelectedElement ? editingSelectedAstElement?.props.style : {}), // 將編輯中的節點樣式覆蓋到畫面上
//       },
//       className: clsx([
//         props.className,
//         {
//           "selected-element": isSelectedElement,
//           "drag-over-element": isDragOverAstElement,
//         },
//       ]),
//     },
//     renderChildren
//   );
// };
const RenderNode: React.FC<RecursivlyRenderAstNodeProps> = memo(
  ({ ast, ...p }) => {
    console.log("ast.uuid", ast.uuid);
    const {
      selectedAstElement,
      editingSelectedAstElement,
      dragOverAstElement,
      handleOnClick,
      handleOnDragStart,
      handleOnDragOver,
      handleOnDragLeave,
      handleOnDrop,
    } = p;
    const isTextElement = "innerType" in ast;
    // Base case: If the node is a text node, render it as is
    if (isTextElement) {
      return ast.content;
    }

    const node: AstElement = ast;
    // Otherwise, it's an element node
    const { uuid, type, props, children } = node;
    const isRootElement = node.parentUuid === "root";
    const isSelectedElement =
      selectedAstElement && selectedAstElement.uuid === uuid;
    const isDragOverAstElement =
      dragOverAstElement && dragOverAstElement.uuid === node.uuid;
    const draggable = !isRootElement && isSelectedElement;

    // register event for web-editor
    const editorEventListeners: {
      [key: string]: React.EventHandler<SyntheticEvent> | undefined;
    } = {};
    editorEventListeners.onClick = (e: React.MouseEvent) => {
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
          ...(isSelectedElement ? editingSelectedAstElement?.props.style : {}), // 將編輯中的節點樣式覆蓋到畫面上
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
  }
);

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

  const handleOnDragOver: (ev: React.DragEvent, node: AstElement) => void =
    useCallback((ev, inAstElement) => {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
      setDragOverAstElement(inAstElement);
    }, []);

  const handleOnDragLeave: (ev: React.DragEvent, node: AstElement) => void =
    useCallback((ev, leaveAstElement) => {
      ev.preventDefault();
      setDragOverAstElement(null);
    }, []);

  const handleOnDrop: (ev: React.DragEvent, node: AstElement) => void =
    useCallback((ev, drop) => {
      // const data = ev.dataTransfer.getData("application/json");
      // const drag = JSON.parse(data);
      setDragOverAstElement(null);
    }, []);

  return (
    <div id="ast-renderer">
      <RenderNode
        ast={ast}
        selectedAstElement={selectedAstElement}
        editingSelectedAstElement={editingSelectedAstElement}
        handleOnClick={handleOnClick}
        handleOnDragStart={handleOnDragStart}
        handleOnDragOver={handleOnDragOver}
        handleOnDragLeave={handleOnDragLeave}
        handleOnDrop={handleOnDrop}
        dragOverAstElement={dragOverAstElement}
      />
    </div>
  );
};

export default RenderReactAST;
