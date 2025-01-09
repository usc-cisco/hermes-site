import { useState } from "react"

import classes from "./Navbar.module.css"

const data = [
  { link: "/", label: "Home" },
  { link: "/faqs", label: "FAQs" },
]

export function Navbar() {
  const [active, setActive] = useState("Billing")

  return (
    <nav className={`flex px-6 py-6 bg-[#1752F0]`}>
      <div className={`${classes.navbarMain} flex`}>
        <img className="w-auto h-8 mr-auto" src="src/assets/cisco-logo-white.png" alt="" />
        <div className="space-x-6">
          {data.map((navLink) => (
            <a
              className={`${classes.link} text-white font-roboto ring-white focus:ring-1 focus:ring-opacity-75 focus:outline-none p-2`}
              data-active={navLink.label === active || undefined}
              href={navLink.link}
              key={navLink.label}
              // onClick={(event) => {
              //   event.preventDefault()
              //   setActive(navLink.label)
              // }}
            >
              <span>{navLink.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
