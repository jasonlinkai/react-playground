import {
  types as t,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
} from "mobx-state-tree";
import { AstNodeModel } from "./AstNodeModel";
import type { AstNodeModelType } from "./AstNodeModel";

export const EditorModel = t
  .model("EditorModel", {
    selectedAstNode: t.maybe(t.reference(AstNodeModel)),
    dragingAstNode: t.maybe(t.reference(AstNodeModel)),
  })
  .actions((self) => ({
    setSelectedAstNode(node: AstNodeModelType | undefined) {
      if (node) {
        if (!self.selectedAstNode) {
          self.selectedAstNode = node;
          node.setEditingStyle(node.props.style);
          if (node.isPureTextNode) {
            node.setEditingContent(node.content || "");
          }
        } else {
          if (node.uuid !== self.selectedAstNode.uuid) {
            self.selectedAstNode.setEditingStyle({});
            if (node.isPureTextNode) {
              node.setEditingContent(node.content || "");
            }
            self.selectedAstNode = node;
            node.setEditingStyle(getSnapshot(node.props.style));
          }
        }
      } else {
        self.selectedAstNode = node;
      }
    },
    setDragingAstNode(node: AstNodeModelType | undefined) {
      self.dragingAstNode = node;
    },
  }));

export type EditorModelType = Instance<typeof EditorModel>;
export type EditorModelSnapshotInType = SnapshotIn<typeof EditorModel>;
export type EditorModelSnapshotOutType = SnapshotOut<typeof EditorModel>;
