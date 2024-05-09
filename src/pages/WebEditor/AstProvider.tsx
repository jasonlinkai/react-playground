// AstContext.tsx

import React, { createContext, useCallback, useContext, useState } from "react";
import { EventNames } from "./event";
import { AstElement } from "./RenderReactAst/ast";

const rootAstNode: AstElement = {
  uuid: "1",
  parentUuid: "root",
  type: "div",
  props: {
    key: "key_1",
    className: "container",
    style: {
      width: "100%",
      height: "100%",
      backgroundColor: "yellow",
    },
  },
  events: {
    onClick: {
      type: EventNames.NAVIGATE,
      payload: { path: "/about!" },
    },
  },
  children: [
    {
      uuid: "2",
      parentUuid: "1",
      type: "button",
      props: {
        key: "key_2",
        style: {
          color: "blue",
          width: "100px",
        },
      },
      events: {
        onClick: {
          type: EventNames.NAVIGATE,
          payload: { path: "/test!" },
        },
      },
      children: [
        {
          uuid: "3",
          parentUuid: "2",
          innerType: "inner-text",
          content: "Click me",
        },
        {
          uuid: "4",
          parentUuid: "2",
          type: "div",
          props: {
            key: "key_4",
            className: "",
            style: {},
          },
          events: {},
          children: [
            {
              uuid: "5",
              parentUuid: "4",
              type: "div",
              props: {
                key: "key_5",
                className: "",
                style: {},
              },
              events: {},
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

// Define the shape of our context
interface AstContextType {
  ast: AstElement;
  selectedAstElement: AstElement | null;
  setSelectedAstElement: (selectedAstElement: AstElement) => void;
  editingSelectedAstElement: AstElement | null;
  setEditingSelectedAstElement: (editingSelectedAstElement: AstElement) => void;
  updateAstElementStyleByUuid: ({
    uuid,
    updates,
  }: UpdateAstElementFuncProps) => void;
}

export interface UpdateAstElementFuncProps {
  uuid: AstElement["uuid"];
  updates: React.CSSProperties;
}

// Create a context with initial values
const AstContext = createContext<AstContextType>({
  ast: rootAstNode,
  selectedAstElement: null,
  setSelectedAstElement: (selectedAstElement: AstElement) => {},
  editingSelectedAstElement: null,
  setEditingSelectedAstElement: (editingSelectedAstElement: AstElement) => {},
  updateAstElementStyleByUuid: ({
    uuid,
    updates,
  }: UpdateAstElementFuncProps) => {},
});

// Create a custom hook to use the AstContext
export const useAst = () => useContext(AstContext);

const travralTreeAndUpdateStyle = ({
  node,
  uuid,
  updates,
}: { node: AstElement } & UpdateAstElementFuncProps): boolean => {
  if (node.uuid === uuid) {
    node.props = {
      ...node.props,
      style: updates,
    };
    return true;
  } else if (node.children) {
    for (let child of node.children) {
      const isTextElement = "innerType" in child;
      if (!isTextElement) {
        if (
          travralTreeAndUpdateStyle({
            node: child as AstElement,
            uuid,
            updates,
          })
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

// Create a provider component to wrap your app with
export const AstProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [ast, setAst] = useState<AstElement>(rootAstNode);
  const [selectedAstElement, _setSelectedAstElement] =
    useState<AstElement | null>(null);
  const [editingSelectedAstElement, setEditingSelectedAstElement] =
    useState<AstElement | null>(null);
  const setSelectedAstElement = useCallback(
    (selected: AstElement | null) => {
      if (selected && selected.uuid !== selectedAstElement?.uuid) {
        _setSelectedAstElement({ ...selected });
        setEditingSelectedAstElement({ ...selected });
      }
    },
    [selectedAstElement]
  );
  const updateAstElementStyleByUuid = useCallback(
    ({ uuid, updates }: UpdateAstElementFuncProps) => {
      const newAst: AstElement = JSON.parse(JSON.stringify(ast));
      travralTreeAndUpdateStyle({ node: newAst, uuid, updates });
      setAst(newAst);
    },
    [ast]
  );
  return (
    <AstContext.Provider
      value={{
        ast,
        selectedAstElement,
        setSelectedAstElement,
        editingSelectedAstElement,
        setEditingSelectedAstElement,
        updateAstElementStyleByUuid,
      }}
    >
      {children}
    </AstContext.Provider>
  );
};
