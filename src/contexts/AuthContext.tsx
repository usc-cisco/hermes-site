import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  jwtToken: string | null
  basicAuthToken: string | null
  setJwtAuth: (token: string) => void
  setBasicAuth: (username: string, password: string) => void
  clearAuth: () => void
  isAdmin: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem("jwtToken"))
  const [basicAuthToken, setBasicAuthToken] = useState<string | null>(localStorage.getItem("basicToken"))
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const setJwtAuth = (token: string) => {
    localStorage.setItem("jwtToken", token)
    setJwtToken(token)
  }

  const setBasicAuth = (username: string, password: string) => {
    const token = btoa(`${username}:${password}`)
    localStorage.setItem("basicToken", token)
    setBasicAuthToken(token)
  }

  const clearAuth = () => {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("basicToken")
    setJwtToken(null)
    setBasicAuthToken(null)
  }

  // Check token expiration on mount and token change
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

  const isAuthenticated = Boolean(jwtToken || basicAuthToken)

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

// Helper function to get auth headers for API calls
// export function getAuthHeaders() {
//   const { jwtToken, basicToken } = useAuth()

//   if (jwtToken) {
//     return {
//       Authorization: `Bearer ${jwtToken}`,
//     }
//   }

//   if (basicToken) {
//     return {
//       Authorization: `Basic ${basicToken}`,
//     }
//   }

//   return {}
// }
