import { useState } from "react"

import Footer from "./components/Footer"

function App() {
  const [count, setCount] = useState(2)

  return (
    <>
      <h1 className="text-3xl text-red-500 underline">Hello world!</h1>
      <Footer />
    </>
  )
}

export default App
