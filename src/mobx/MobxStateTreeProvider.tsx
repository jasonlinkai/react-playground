import React from "react";

import { connectReduxDevtools } from "mst-middlewares";

import { IStore, RootStore } from ".";
import { rootAstNode } from "../pages/WebEditor/AstProvider";
import { AstNode } from "./AstNode";

const store = RootStore.create({
  ast: AstNode.create(rootAstNode),
});
export const StoreContext = React.createContext<IStore | null>(store);

if (process.env.NODE_ENV === "development") {
  /* tslint:disable-next-line */
  connectReduxDevtools(require("remotedev"), store);
}

export const MobxStateTreeStoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
