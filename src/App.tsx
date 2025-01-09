import { useState } from "react"

import Layout from "./components/Layout"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <h1 className="text-3xl text-red-500 underline">Hello world!</h1>
      </Layout>
    </>
  )
}

export default App
