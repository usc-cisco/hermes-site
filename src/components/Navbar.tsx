const navLinks = [
  { link: "/", label: "Home" },
  { link: "/faqs", label: "FAQs" },
]

export function Navbar() {
  return (
    <nav className={`px-6 py-6 bg-[#1752F0]`}>
      <div className="flex">
        <img className="w-auto h-6 mr-auto" src="./public/cisco-logo-white.png" alt="" />
        <div className="space-x-6">
          {navLinks.map((navLink) => (
            <a
              className="text-white ring-white focus:ring-1 focus:ring-opacity-75 focus:outline-none p-2"
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
