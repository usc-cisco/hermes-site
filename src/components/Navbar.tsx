import { useState } from "react"

import { Code, Group } from "@mantine/core"

import classes from "./Navbar.module.css"

const data = [
  { link: "/", label: "Home" },
  { link: "/faqs", label: "FAQs" },
]

export function Navbar() {
  const [active, setActive] = useState("Billing")

  const links = data.map((item) => (
    <a
      className={classes.link}
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
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>
    </nav>
  )
}
