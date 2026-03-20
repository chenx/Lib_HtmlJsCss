import React, {useEffect, useState} from 'react'
import './App.css'

export default function App() {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = checked ? 'black' : 'white'
    document.body.style.color = checked ? 'white' : 'black'

    return () => {
      document.body.style.color = ''
      document.body.style.backgroundColor = ''
    }
  }, [checked])

  return (
    <div style={{margin: 'auto', textAlign: 'center'}}>
      <input type="checkbox" checked={checked} onChange={(e) => setChecked(prev => ! prev)} /> Toggle Background Color
    </div>
  )
}
