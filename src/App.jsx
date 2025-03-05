import { useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center bg-neutral-950 text-neutral-300'>
      <h1 className='text-2xl text-center font-bold'>Excalidraw Canvas</h1>
        <Excalidraw />
      </div>
    </>
  )
}

export default App
