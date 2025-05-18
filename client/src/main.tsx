import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./assets/fonts/typography.css";
import { mantineTheme } from "./config/theme.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={mantineTheme}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
