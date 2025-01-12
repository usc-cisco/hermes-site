import { useEffect } from "react"

import { useLocation, useNavigate } from "react-router"

import { AuthForm } from "../components/auth/AuthForm"
import { useAuth } from "../contexts/AuthContext"

export default function Auth() {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin", { replace: true })
    } else if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, isAdmin, navigate, from])

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center gap-4">
        <AuthForm />
      </div>
    )
  }

  return null
}
