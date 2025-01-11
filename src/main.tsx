import { StrictMode } from "react"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { ModalsProvider } from "@mantine/modals"
import { createRoot } from "react-dom/client"
import { HashRouter, Route, Routes } from "react-router"

import App from "./App.tsx"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import Layout from "./components/layout/Layout.tsx"
import { theme } from "./config/theme.ts"
import { AuthProvider } from "./contexts/AuthContext"
import "./index.css"
import AdminPage from "./pages/AdminPage.tsx"
import Auth from "./pages/Auth.tsx"
import FAQ from "./pages/FAQ.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider theme={theme}>
        <ModalsProvider labels={{ confirm: "Confirm", cancel: "Cancel" }}>
          <HashRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <App />
                    </ProtectedRoute>
                  }
                />
                <Route path="/faqs" element={<FAQ />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </ModalsProvider>
      </MantineProvider>
    </AuthProvider>
  </StrictMode>,
)
