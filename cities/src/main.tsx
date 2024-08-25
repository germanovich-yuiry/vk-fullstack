import { render } from "preact";

import FontStyles from "./styles/fontStyles.ts";
import GlobalStyles from "./styles/global.ts";
import { StrictMode } from "react";

import App from "./app.tsx";

render(
  <StrictMode>
    <FontStyles />
    <App />
    <GlobalStyles />
  </StrictMode>,
  document.getElementById("app")!
);
