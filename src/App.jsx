import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Board } from './Board'




function App() {
  const  [board, setBoard] = useState(false)
  
  return (
    <div className='board'>
      <Board></Board>
    </div>
  )
}


export default App
