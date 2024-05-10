import { types as t, Instance } from "mobx-state-tree";
import { AstNode } from "./AstNode";

export const RootStore = t
  .model("RootStore", {
    ast: t.maybe(AstNode),
  })
  .actions(self => {
    const afterCreate = () => {
      console.log(self.ast);
    };
    return { afterCreate };
  })

export interface IStore extends Instance<typeof RootStore> {}
