import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  jwtToken: string | null
  basicToken: string | null
  isAdmin: boolean
  setJwtAuth: (token: string) => void
  setBasicAuth: (username: string, password: string) => void
  clearAuth: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem("jwtToken"))
  const [basicToken, setBasicToken] = useState<string | null>(localStorage.getItem("basicToken"))
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const setJwtAuth = (token: string) => {
    localStorage.setItem("jwtToken", token)
    setJwtToken(token)
    // Check if token contains admin claim
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      setIsAdmin(payload.isAdmin === true)
    } catch (error) {
      console.error("Error parsing JWT token:", error)
      setIsAdmin(false)
    }
  }

  const setBasicAuth = (username: string, password: string) => {
    const token = btoa(`${username}:${password}`)
    localStorage.setItem("basicToken", token)
    setBasicToken(token)
    // You might want to set admin status based on your requirements
    setIsAdmin(username === "admin") // Example condition
  }

  const clearAuth = () => {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("basicToken")
    setJwtToken(null)
    setBasicToken(null)
    setIsAdmin(false)
  }

  const isAuthenticated = Boolean(jwtToken || basicToken)

  const value = {
    jwtToken,
    basicToken,
    isAdmin,
    setJwtAuth,
    setBasicAuth,
    clearAuth,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
