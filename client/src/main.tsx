import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App.tsx";
import "./assets/fonts/typography.css";
import { mantineTheme } from "./config/theme.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={mantineTheme}
      defaultColorScheme="auto"
      forceColorScheme="light"
    >
      <Toaster
        closeButton
        richColors
        toastOptions={{
          style: {
            fontFamily: "var(--font-sans)",
            fontSize: ".8rem",
          },
        }}
        position="top-right"
      />
      <App />
    </MantineProvider>
  </StrictMode>,
);
