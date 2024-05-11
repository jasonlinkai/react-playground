import React from "react";

// import { connectReduxDevtools } from "mst-middlewares";

import { IStore, RootStore } from "./RootStore";
import { rootAstNode } from "../pages/WebEditor/templates";
import { onSnapshot } from "mobx-state-tree";

const store = RootStore.create({
  ast: rootAstNode,
});

export const StoreContext = React.createContext<IStore>(store);

if (process.env.NODE_ENV === "development") {
  /* tslint:disable-next-line */
  // connectReduxDevtools(require("remotedev"), store);
}

onSnapshot(store, (snapshot) => {
  localStorage.setItem("RootStore", JSON.stringify(snapshot));
  console.log('snapshot.editor', snapshot.editor);
});

export const MobxStateTreeStoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
