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
      <div className="fixed inset-0 z-0 flex flex-col bg-white lg:flex-row">
        {/* Repeating logo background pattern */}
        <div
          className="pointer-events-none absolute inset-0 animate-[drift_8s_linear_infinite] opacity-[0.03]"
          style={{
            backgroundImage: "url('/logo-primary.svg')",
            backgroundSize: "150px 150px",
            backgroundRepeat: "repeat",
            willChange: "background-position",
          }}
        />
        <style>
          {`
            @keyframes drift {
              from {
                background-position: 0 0;
              }
              to {
                background-position: 150px -150px;
              }
            }
          `}
        </style>

        {/* Left Section - Branding (Desktop) */}
        <div className="relative z-10 hidden flex-1 flex-col justify-center px-16 lg:flex">
          <div className="flex items-center gap-6">
            <img src="/logo-primary.svg" alt="Hermes Logo" className="h-24 w-auto" />
            <div className="border-l-2 border-primary pl-6">
              <p className="text-sm font-medium tracking-widest text-primary">PROJECT</p>
              <h1 className="text-5xl font-black tracking-tight text-primary">
                HERMES <sup className="text-lg">©</sup>
              </h1>
              <p className="mt-1 text-sm text-primary/60">An Open Source Initiative by DCISM Students &amp; CISCO.</p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-4">
          <img
            src="/diagonal-lines.svg"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-20"
          />
          <div className="relative z-10 flex flex-col items-center">
            {/* Mobile Header - Branding */}
            <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
              <img src="/logo-primary.svg" alt="Hermes Logo" className="h-10 w-auto" />
              <h1 className="text-5xl font-black tracking-tight text-primary">
                HERMES <sup className="text-xl">©</sup>
              </h1>
            </div>
            <AuthForm />
          </div>
        </div>
      </div>
    )
  }

  return null
}
