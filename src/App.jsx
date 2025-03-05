import { useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-2xl'>Excalidraw Example</h1>
      <div className='w-full h-screen'>
        <Excalidraw />
      </div>
    </>
  )
}

export default App
