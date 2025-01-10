const navLinks = [
  { link: "/", label: "Home" },
  { link: "/faqs", label: "FAQs" },
]

export function Navbar() {
  return (
    <nav className="mb-4 bg-primary px-6 py-6">
      <div className="flex">
        <img className="mr-auto h-6 w-auto" src="/cisco-logo-white.png" alt="" />
        <div className="space-x-6">
          {navLinks.map((navLink) => (
            <a
              className="rounded-md p-2 text-white ring-white focus:outline-none focus:ring-1 focus:ring-opacity-75"
              href={navLink.link}
              key={navLink.label}
            >
              <span>{navLink.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
