import { types as t, Instance } from "mobx-state-tree";
import { AstNodeModel } from "./AstNodeModel";
import { EditorModel } from "./EditorModel";

export const RootStore = t
  .model("RootStore", {
    ast: t.maybe(AstNodeModel),
    editor: t.optional(EditorModel, {}),
  })

export interface IStore extends Instance<typeof RootStore> {}
