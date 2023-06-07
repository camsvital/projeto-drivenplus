import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1>projeto</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {count}
        </button>
        <p>
          
        </p>
      </div>
      <p className="read-the-docs">
      </p>
    </>
  )
}