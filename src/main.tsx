import { StrictMode } from "react"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { ModalsProvider } from "@mantine/modals"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"

import App from "./App.tsx"
import Layout from "./components/layout/Layout.tsx"
import { theme } from "./config/theme.ts"
import "./index.css"
import AdminPage from "./pages/AdminPage.tsx"
import Auth from "./pages/Auth.tsx"
import FAQ from "./pages/FAQ.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ModalsProvider labels={{ confirm: "Confirm", cancel: "Cancel" }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
)
