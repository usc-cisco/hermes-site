import { StrictMode } from "react"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { ModalsProvider } from "@mantine/modals"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"
import { theme } from "./config/theme.ts"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ModalsProvider labels={{ confirm: "Confirm", cancel: "Cancel" }}>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
)
