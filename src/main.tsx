import { StrictMode } from "react"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"

import { ModalsProvider } from "@mantine/modals"

import { theme } from "./config/theme.ts"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"

import App from "./App.tsx"

import Layout from "./components/Layout.tsx"
import "./index.css"
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
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
)