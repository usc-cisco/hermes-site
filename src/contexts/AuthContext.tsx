import React, { createContext, useContext, useEffect, useState } from "react"

import { jwtDecode } from "jwt-decode"

import { type CourseNameEnum } from "../types/enums/CourseNameEnum"
import toast from "../utils/toast"

interface AuthContextType {
  jwtToken: string | null
  basicAuthToken: string | null
  setJwtAuth: (token: string) => void
  setBasicAuth: (token: string) => void
  clearAuth: () => void
  submittedCourse: CourseNameEnum | null
  setSubmittedCourse: (submittedCourse: CourseNameEnum) => void
  isAdmin: boolean
  isAuthenticated: boolean
  idNumber: string | undefined
  course: CourseNameEnum | undefined
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem("jwtToken"))
  const [basicAuthToken, setBasicAuthToken] = useState<string | null>(localStorage.getItem("basicToken"))
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [submittedCourse, setSubmittedCourse] = useState<CourseNameEnum | null>(null)

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
    setSubmittedCourse(null)
  }

  useEffect(() => {
    // Handle basic auth
    if (basicAuthToken) {
      setIsAuthenticated(true)
      setIsAdmin(true)
      return
    }

    // Handle JWT auth
    if (jwtToken) {
      try {
        const payload = JSON.parse(atob(jwtToken.split(".")[1]))
        const expiration = payload.exp * 1000 // Convert to milliseconds

        if (Date.now() >= expiration) {
          clearAuth()
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Error parsing JWT token:", error)
        clearAuth()
      }
    } else {
      setIsAuthenticated(false)
      setIsAdmin(false)
    }
  }, [jwtToken, basicAuthToken])

  const { idNumber, course } = jwtToken
    ? jwtDecode<{ idNumber: string; course: CourseNameEnum }>(jwtToken)
    : { idNumber: undefined, course: undefined }

  useEffect(() => {
    if (submittedCourse && course !== submittedCourse) {
      toast.error(`Already have a number under ${submittedCourse}.`, {
        description: "Please leave your current queue first.",
      })
      clearAuth()
    }
  }, [course, submittedCourse])

  const value = {
    jwtToken,
    basicAuthToken,
    setJwtAuth,
    setBasicAuth,
    clearAuth,
    submittedCourse,
    setSubmittedCourse,
    isAuthenticated,
    isAdmin,
    idNumber,
    course,
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
