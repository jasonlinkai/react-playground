import {
  types as t,
  IAnyModelType,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { AstNodeModel } from "./AstNodeModel";
import type { AstNodeModelType } from "./AstNodeModel";

export const EditorModel = t
  .model("EditorModel", {
    selectedAstNode: t.maybe(t.reference(t.late((): IAnyModelType => AstNodeModel))),
  })
  .actions((self) => ({
    setSelectedAstNode(selectedAstNode: AstNodeModelType) {
      self.selectedAstNode = selectedAstNode;
    },
  }));

export type EditorModelType = Instance<typeof EditorModel>;
export type EditorModelSnapshotInType = SnapshotIn<typeof EditorModel>;
export type EditorModelSnapshotOutType = SnapshotOut<typeof EditorModel>;
