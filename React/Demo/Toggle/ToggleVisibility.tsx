// Toggle Visibility: show/hide text (conditional rendering).

import React, {useState} from 'react'
import './App.css'

export default function App() {
  const [showText, setShowText] = useState(true)

  const toggleText = (checked: boolean) => {
    setShowText(checked)
  }

  return (
    <>
      <div>
        <input type="checkbox" onClick={() => toggleText(!showText)} checked={showText} /> Toggle Text Below
      </div>
      <div style={{display: showText ? 'block' : 'none'}}>
        Hello world
      </div>
    </>
  )
}
