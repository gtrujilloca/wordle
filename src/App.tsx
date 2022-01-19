import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Wordle from './components/Wordle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Wordle/>
  )
}

export default App
