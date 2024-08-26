import { render } from "preact";

import { RootStoreContext } from "./root-store-context.ts";
import RootStore from "./stores/rootStore.ts";

import FontStyles from "./styles/fontStyles.ts";
import GlobalStyles from "./styles/global.ts";
import { StrictMode } from "react";

import App from "./app.tsx";

render(
  <StrictMode>
    <RootStoreContext.Provider value={new RootStore()}>
      <FontStyles />
      <App />
      <GlobalStyles />
    </RootStoreContext.Provider>
  </StrictMode>,
  document.getElementById("app")!
);
