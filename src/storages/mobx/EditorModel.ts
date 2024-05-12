import {
  types as t,
  IAnyModelType,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
} from "mobx-state-tree";
import { AstNodeModel } from "./AstNodeModel";
import type { AstNodeModelType } from "./AstNodeModel";

export const EditorModel = t
  .model("EditorModel", {
    selectedAstNode: t.maybe(
      t.reference(t.late((): IAnyModelType => AstNodeModel))
    ),
  })
  .actions((self) => ({
    setSelectedAstNode(node: AstNodeModelType) {
      if (!self.selectedAstNode) {
        self.selectedAstNode = node;
        node.setEditingStyle(node.props.style);
      } else {
        if (node.uuid !== self.selectedAstNode.uuid) {
          self.selectedAstNode.setEditingStyle({});
          self.selectedAstNode = node;
          node.setEditingStyle(getSnapshot(node.props.style));
        }
      }
    },
  }));

export type EditorModelType = Instance<typeof EditorModel>;
export type EditorModelSnapshotInType = SnapshotIn<typeof EditorModel>;
export type EditorModelSnapshotOutType = SnapshotOut<typeof EditorModel>;
