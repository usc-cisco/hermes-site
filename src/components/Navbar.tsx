import { useState } from "react"

import classes from "./Navbar.module.css"

const data = [
  { link: "/", label: "Home" },
  { link: "/faqs", label: "FAQs" },
]

export function Navbar() {
  const [active, setActive] = useState("Billing")

  const links = data.map((item) => (
    <a
      className={`${classes.link} text-white`}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={`flex px-4 py-6 bg-[#1752F0]`}>
      <div className={`${classes.navbarMain} flex`}>
        <img className="w-auto h-8 mr-auto" src="src/assets/cisco-logo-white.png" alt="" />
        <div className="space-x-6">{links}</div>
      </div>
    </nav>
  )
}
