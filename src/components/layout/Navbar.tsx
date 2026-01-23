import { LogOut } from "lucide-react"
import { Link } from "react-router"

import { useAuth } from "../../contexts/AuthContext"

export function Navbar() {
  const { isAuthenticated, isAdmin, clearAuth } = useAuth()

  return (
    <nav className="mb-4 bg-primary px-6 py-4">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center text-lg font-semibold text-white sm:text-xl">
          <img src="/logo-white.svg" alt="Hermes Logo" className="mr-2 inline h-6 w-auto" />
          HERMES
        </Link>
        <span className="text-sm text-gray-400">| queue.dcism.org</span>
        <div className="ml-auto flex items-center gap-2 space-x-6">
          <Link
            className="rounded-md leading-none text-white ring-white focus:outline-none focus:ring-1 focus:ring-opacity-75"
            to="/faq"
          >
            FAQs
          </Link>
          {isAdmin && (
            <Link
              className="rounded-md leading-none text-white ring-white focus:outline-none focus:ring-1 focus:ring-opacity-75"
              to="/admin"
            >
              Admin
            </Link>
          )}
          {isAuthenticated && (
            <button title="Sign out" onClick={() => clearAuth()}>
              <LogOut className="size-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
