import {
  types as t,
  IAnyModelType,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { AstNode } from "./AstNode";
import type { AstNodeType } from "./AstNode";

export const Editor = t
  .model("Editor", {
    selectedAstNode: t.maybe(t.reference(t.late((): IAnyModelType => AstNode))),
    editingSelectedAstNode: t.maybe(
      t.reference(t.late((): IAnyModelType => AstNode))
    ),
  })
  .actions((self) => ({
    setSelectedAstNode(selectedAstNode: AstNodeType) {
      self.selectedAstNode = selectedAstNode;
    },
    setEditingSelectedAstNode(editingSelectedAstNode: AstNodeType) {
      self.editingSelectedAstNode = editingSelectedAstNode;
    },
  }));

export type EditorType = Instance<typeof Editor>;
export type EditorSnapshotInType = SnapshotIn<typeof Editor>;
export type EditorSnapshotOutType = SnapshotOut<typeof Editor>;
