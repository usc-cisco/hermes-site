import { StrictMode } from "react"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
)
