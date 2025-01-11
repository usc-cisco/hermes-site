import { StrictMode } from "react"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { ModalsProvider } from "@mantine/modals"
import { createRoot } from "react-dom/client"
import { HashRouter, Route, Routes } from "react-router"

import App from "./App.tsx"
import Layout from "./components/Layout.tsx"
import { theme } from "./config/theme.ts"
import "./index.css"
import AdminPage from "./pages/AdminPage.tsx"
import FAQ from "./pages/FAQ.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ModalsProvider labels={{ confirm: "Confirm", cancel: "Cancel" }}>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
)
