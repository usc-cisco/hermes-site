import React from "react"

import Footer from "./Footer"
import { Navbar } from "./Navbar"

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="flex-grow min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}
