import { createContext } from "preact";
import RootStore from "./stores/rootStore";
import { useContext } from "react";

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = () => {
  const context = useContext(RootStoreContext);

  if (context === null) {
    throw new Error("");
  }
  return context;
};
