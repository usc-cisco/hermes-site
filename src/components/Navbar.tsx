import { Link } from "react-router"

const navLinks = [
  { link: "/", label: "Home" },
  { link: "/faq", label: "FAQs" },
]

export function Navbar() {
  return (
    <nav className="mb-8 bg-primary px-6 py-6">
      <div className="flex">
        <img className="mr-auto h-6 w-auto" src="/cisco-logo-white.png" alt="" />
        <div className="space-x-6">
          {navLinks.map((navLink) => (
            <Link
              className="rounded-md p-2 text-white ring-white focus:outline-none focus:ring-1 focus:ring-opacity-75"
              to={navLink.link}
              key={navLink.label}
            >
              <span>{navLink.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
