import { LogOut } from "lucide-react"
import { Link } from "react-router"

import { useAuth } from "../../contexts/AuthContext"

export function Navbar() {
  const { isAuthenticated, isAdmin, clearAuth } = useAuth()

  return (
    <nav className="relative z-10 mb-4 hidden px-6 py-4 lg:block">
      <div className="flex items-center gap-2">
        <div className="group flex items-center gap-2 rounded-full border-2 border-primary bg-primary px-6 py-2 transition-colors hover:bg-transparent">
          <Link
            to="/"
            className="flex items-center text-lg font-semibold text-white transition-colors group-hover:text-primary sm:text-xl"
          >
            <img src="/logo-white.svg" alt="Hermes Logo" className="mr-2 inline h-6 w-auto group-hover:hidden" />
            <img src="/logo-primary.svg" alt="Hermes Logo" className="mr-2 hidden h-6 w-auto group-hover:inline" />
            HERMES
          </Link>
          <span className="text-sm text-blue-200 transition-colors group-hover:text-primary/60">| queue.dcism.org</span>
        </div>
        <div className="ml-auto flex items-center gap-2 space-x-6">
          <Link
            className="rounded-full border-2 border-black bg-black px-6 py-3 leading-none text-white transition-colors hover:bg-transparent hover:text-black focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-75"
            to="/faq"
          >
            FAQs
          </Link>
          {isAdmin && (
            <Link
              className="rounded-md leading-none text-black ring-white focus:outline-none focus:ring-1 focus:ring-opacity-75"
              to="/admin"
            >
              Admin
            </Link>
          )}
          {isAuthenticated && (
            <button title="Sign out" onClick={() => clearAuth()}>
              <LogOut className="size-4 text-red-600" />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
