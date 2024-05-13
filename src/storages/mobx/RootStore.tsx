import {
  types as t,
  Instance,
  getSnapshot,
  applySnapshot,
  onSnapshot,
  IDisposer,
} from "mobx-state-tree";
import { AstNodeModel, AstNodeModelSnapshotOutType } from "./AstNodeModel";
import { EditorModel } from "./EditorModel";

export const RootStore = t
  .model("RootStore", {
    ast: AstNodeModel,
    editor: t.optional(EditorModel, {}),
  })
  .volatile<{
    onSnapshotDisposer: IDisposer | undefined;
    canSaveSnapshot: boolean;
    astSnapshots: AstNodeModelSnapshotOutType[];
    astSnapshotsIndex: number;
  }>(() => ({
    onSnapshotDisposer: undefined,
    canSaveSnapshot: true,
    astSnapshots: [],
    astSnapshotsIndex: 0,
  }))
  .views<{
    canUndo: boolean;
    canRedo: boolean;
  }>((self) => ({
    get canUndo() {
      return self.astSnapshotsIndex - 1 >= 0;
    },
    get canRedo() {
      return self.astSnapshotsIndex + 1 <= self.astSnapshots.length - 1;
    },
  }))
  .actions((self) => {
    const setCanSaveSnapshot = (v: boolean) => {
      self.canSaveSnapshot = v;
    };

    const addAstSnapshot = (astSnapshot: AstNodeModelSnapshotOutType) => {
      self.astSnapshots = [...self.astSnapshots, astSnapshot];
      self.astSnapshotsIndex = self.astSnapshots.length - 1;
    };

    const undoAst = () => {
      if (self.canUndo) {
        const prev = self.astSnapshotsIndex - 1;
        self.astSnapshotsIndex = prev;
        const prevAstSnapshot = self.astSnapshots[prev];
        self.editor.setSelectedAstNode(undefined);
        self.editor.setDragingAstNode(undefined);
        self.canSaveSnapshot = false;
        applySnapshot(self.ast, prevAstSnapshot);
      }
    };

    const redoAst = () => {
      if (self.canRedo) {
        const next = self.astSnapshotsIndex + 1;
        self.astSnapshotsIndex = next;
        const nextAstSnapshot = self.astSnapshots[next];
        self.editor.setSelectedAstNode(undefined);
        self.editor.setDragingAstNode(undefined);
        self.canSaveSnapshot = false;
        applySnapshot(self.ast, nextAstSnapshot);
      }
    };

    return {
      setCanSaveSnapshot,
      addAstSnapshot,
      undoAst,
      redoAst,
    };
  })
  .actions((self) => {
    // 保存每次ast的異動
    self.onSnapshotDisposer = onSnapshot(self.ast, (snapshot) => {
      if (self.canSaveSnapshot) {
        self.addAstSnapshot(snapshot);
      } else {
        self.setCanSaveSnapshot(true);
      }
    });

    // 當model create時 保存初始化的snapshot
    const afterCreate = () => {
      self.astSnapshots = [getSnapshot(self.ast)];
    };

    const beforeDestroy = () => {
      if (self.onSnapshotDisposer) {
        self.onSnapshotDisposer();
      }
    };
    return { afterCreate, beforeDestroy };
  });

export interface IStore extends Instance<typeof RootStore> {}
