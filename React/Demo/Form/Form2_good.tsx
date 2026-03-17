import React, {useState, useRef} from 'react'
import './App.css'

export default function App() {
  const [text, setText] = useState('hi')
  const [check, setCheck] = useState(true)

  const submitForm = () => {
    console.log(`submit form: text = ${text}, check = ${check}`)
  }

  return (
    <>
      <div>Input Form</div>
      <form onSubmit={(e) => {e.preventDefault(); submitForm()}}>
        <div><input type="text" value={text} onChange={(e) => setText(e.target.value)}/></div>
        <div><input type="checkbox" checked={check} onChange={(e) => setCheck(e.target.checked)} />Toggle</div>
        <div><button type="submit">Submit</button></div>
      </form>
    </>
  )
}
