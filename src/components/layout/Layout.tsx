import { Outlet } from "react-router"

import Footer from "./Footer"
import { Navbar } from "./Navbar"

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex flex-1 flex-col bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
