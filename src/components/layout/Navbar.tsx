import { LogOut } from "lucide-react"
import { Link } from "react-router"

import { useAuth } from "../../contexts/AuthContext"

export function Navbar() {
  const { isAuthenticated, clearAuth } = useAuth()

  return (
    <nav className="mb-4 bg-primary px-6 py-6">
      <div className="flex">
        <Link to="/" className="mr-auto w-auto text-xl font-semibold text-white">
          queue.dcism.org
        </Link>
        <div className="flex items-center gap-2 space-x-6">
          <Link
            className="rounded-md leading-none text-white ring-white focus:outline-none focus:ring-1 focus:ring-opacity-75"
            to="/faq"
          >
            FAQs
          </Link>
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
