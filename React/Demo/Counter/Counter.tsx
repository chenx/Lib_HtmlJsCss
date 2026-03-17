// Create a simple counter
// Implement a button that increases and decreases a number on the screen.
// Focus: useState, event handling.

import React, {useState} from 'react'
import './App.css'

export default function App() {
  const [counter, setCounter] = useState(0)
  const [message, setMessage] = useState('')

  const updateCounter = (val: number) => {
    if (counter === 0 && val < 0) {
      setMessage('counter cannot be negative')
      return
    }
    setMessage('')
    setCounter(counter => counter + val)
  }

  return (
    <>
      <div>{counter}</div>
      <div>
        <button className="button-1" onClick={() => updateCounter(1)} aria-label="Increase counter">+</button>
        <button className="button-1" onClick={() => updateCounter(-1)} disabled={counter === 0} aria-label="Decrease counter">-</button>
      </div>
      <div>{message}</div>
    </>
  )
}
