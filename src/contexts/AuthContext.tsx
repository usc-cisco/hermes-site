import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  jwtToken: string | null
  basicAuthToken: string | null
  setJwtAuth: (token: string) => void
  setBasicAuth: (token: string) => void
  clearAuth: () => void
  isAdmin: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem("jwtToken"))
  const [basicAuthToken, setBasicAuthToken] = useState<string | null>(localStorage.getItem("basicToken"))
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const setJwtAuth = (token: string) => {
    localStorage.setItem("jwtToken", token)
    setJwtToken(token)
    setIsAuthenticated(true)
  }

  const setBasicAuth = (token: string) => {
    localStorage.setItem("basicToken", token)
    setBasicAuthToken(token)
    setIsAuthenticated(true)
    setIsAdmin(true)
  }

  const clearAuth = () => {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("basicToken")
    setJwtToken(null)
    setBasicAuthToken(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedJwtToken = localStorage.getItem("jwtToken")
    const storedBasicToken = localStorage.getItem("basicToken")

    if (storedBasicToken) {
      setIsAuthenticated(true)
      setIsAdmin(true)
    } else if (storedJwtToken) {
      try {
        const payload = JSON.parse(atob(storedJwtToken.split(".")[1]))
        const expiration = payload.exp * 1000 // Convert to milliseconds

        if (Date.now() < expiration) {
          setIsAuthenticated(true)
        } else {
          clearAuth()
        }
      } catch (error) {
        console.error("Error parsing JWT token:", error)
        clearAuth()
      }
    }
  }, [])

  // Check JWT token expiration
  useEffect(() => {
    if (jwtToken) {
      try {
        const payload = JSON.parse(atob(jwtToken.split(".")[1]))
        const expiration = payload.exp * 1000 // Convert to milliseconds

        if (Date.now() >= expiration) {
          clearAuth()
        }
      } catch (error) {
        console.error("Error parsing JWT token:", error)
        clearAuth()
      }
    }
  }, [jwtToken])

  const value = {
    jwtToken,
    basicAuthToken,
    setJwtAuth,
    setBasicAuth,
    clearAuth,
    isAuthenticated,
    isAdmin,
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
