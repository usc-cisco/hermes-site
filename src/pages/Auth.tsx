import { useLocation, useNavigate } from "react-router"

import { AuthForm } from "../components/auth/AuthForm"
import { useAuth } from "../contexts/AuthContext"

export default function Auth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"

  // If already authenticated, redirect to the intended page
  if (isAuthenticated) {
    return navigate(from, { replace: true })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <AuthForm />
    </div>
  )
}
