import React, {useEffect, useState} from 'react'
import './App.css'

export default function App() {
  const [checked, setChecked] = useState(false)
  const [color, setColor] = useState('')
  const [bgColor, setBgColor] = useState('')

  const toggleState = () => {
    setColor(!checked ? 'white' : 'black')
    setBgColor(!checked ? 'black' : 'white')
    setChecked(checked => ! checked)
  }

  useEffect(() => {
    document.body.style.backgroundColor = bgColor
    document.body.style.color = color

    return () => {
      document.body.style.color = ''
      document.body.style.backgroundColor = ''
    }
  }, [color])

  return (
    <div style={{margin: 'auto', textAlign: 'center'}}>
      <input type="checkbox" checked={checked} onChange={(e) => toggleState()} /> Toggle Background Color
    </div>
  )
}
