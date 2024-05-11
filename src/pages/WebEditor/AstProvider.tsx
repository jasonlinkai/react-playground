// AstContext.tsx

import React, { createContext, useCallback, useContext, useState } from "react";
import { AstElement } from "./RenderReactAst/ast";
import { StyleEnum } from "./StyleEditor";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import { rootAstNode } from "./templates";

// Define the shape of our context

export interface UpdateAstElementFuncProps {
  newAstElement: AstElement;
}

interface AstContextType {
  ast: any;
  selectedAstElement: AstElement | null;
  setSelectedAstElement: (selectedAstElement: AstElement) => void;
  editingSelectedAstElement: AstElement | null;
  setEditingSelectedAstElement: (editingSelectedAstElement: AstElement) => void;
  updateEditingSelectedAstElementStyle: ({
    styleKey,
    styleValue,
  }: {
    styleKey: StyleEnum;
    styleValue: string;
  }) => void;
  updateAstElement: ({ newAstElement }: UpdateAstElementFuncProps) => void;
}
// Create a context with initial values
const AstContext = createContext<AstContextType>({
  ast: rootAstNode,
  selectedAstElement: null,
  setSelectedAstElement: (selectedAstElement: AstElement) => {},
  editingSelectedAstElement: null,
  setEditingSelectedAstElement: (editingSelectedAstElement: AstElement) => {},
  updateEditingSelectedAstElementStyle: ({
    styleKey,
    styleValue,
  }: {
    styleKey: StyleEnum;
    styleValue: string;
  }) => {},
  updateAstElement: ({ newAstElement }: UpdateAstElementFuncProps) => {},
});

// Create a custom hook to use the AstContext
export const useAst = () => useContext(AstContext);

const travralTreeAndUpdate = ({
  node,
  newAstElement,
}: { node: AstElement } & UpdateAstElementFuncProps): boolean => {
  if (node.uuid === newAstElement.uuid) {
    node.props = newAstElement.props;
    node.events = newAstElement.events;
    node.children = newAstElement.children;
    return true;
  } else if (node.children) {
    for (let child of node.children) {
      const isTextElement = "innerType" in child;
      if (!isTextElement) {
        if (
          travralTreeAndUpdate({
            node: child as AstElement,
            newAstElement,
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
  const { ast } = useStores();
  const setAst = (v: any) => console.log(setAst);
  // const [ast, setAst] = useState<AstElement>(rootAstNode);
  const [selectedAstElement, _setSelectedAstElement] =
    useState<AstElement | null>(null);
  const [editingSelectedAstElement, setEditingSelectedAstElement] =
    useState<AstElement | null>(null);
  const setSelectedAstElement = useCallback(
    (selected: AstElement | null) => {
      if (selected && selected.uuid !== selectedAstElement?.uuid) {
        const copiedSelected = JSON.parse(JSON.stringify(selected));
        _setSelectedAstElement(selected);
        setEditingSelectedAstElement(copiedSelected);
      }
    },
    [selectedAstElement]
  );

  const _updateEditionSelectedAstElement = useCallback(
    ({ node }: { node: AstElement }) => {
      setEditingSelectedAstElement({
        ...node,
      });
    },
    []
  );

  const updateEditingSelectedAstElementStyle = useCallback(
    ({ styleKey, styleValue }: { styleKey: StyleEnum; styleValue: string }) => {
      if (editingSelectedAstElement) {
        _updateEditionSelectedAstElement({
          node: {
            ...editingSelectedAstElement,
            props: {
              ...editingSelectedAstElement.props,
              style: {
                ...editingSelectedAstElement.props.style,
                [styleKey]: styleValue,
              },
            },
          },
        });
      }
    },
    [editingSelectedAstElement, _updateEditionSelectedAstElement]
  );

  // 保存異動後的編輯節點至樹上
  const updateAstElement = useCallback(
    ({ newAstElement }: UpdateAstElementFuncProps) => {
      const newAst: AstElement = JSON.parse(JSON.stringify(ast));
      travralTreeAndUpdate({ node: newAst, newAstElement: newAstElement });
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
        updateEditingSelectedAstElementStyle,
        updateAstElement,
      }}
    >
      {children}
    </AstContext.Provider>
  );
};
