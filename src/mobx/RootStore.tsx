import { types as t, Instance } from "mobx-state-tree";
import { AstNode } from "./AstNode";
import { Editor } from "./Editor";

export const RootStore = t
  .model("RootStore", {
    ast: t.maybe(AstNode),
    editor: t.optional(Editor, {}),
  })

export interface IStore extends Instance<typeof RootStore> {}
