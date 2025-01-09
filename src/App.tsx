import { useState } from "react"

import Footer from "./components/Footer"
import { Navbar } from "./components/Navbar"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main className="flex-grow min-h-screen">
        <h1 className="text-3xl text-red-500 underline">Hello world!</h1>
      </main>
      <Footer />
    </>
  )
}

export default App
