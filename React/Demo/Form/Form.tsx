import React, {useState, useRef} from 'react'
import './App.css'

export default function App() {
  const [text, setText] = useState('hi')
  const [check, setCheck] = useState(true)

  const submitForm = () => {
    console.log(`submit form: text = ${text}, check = ${check}`)
  }

  // Note there form will be submitted twice. To submit only once, use only form onsubmit or button onclick.
  return (
    <>
      <div>Input Form</div>
      <form onSubmit={(e) => {e.preventDefault(); submitForm();}}>
        <div><input type="text" value={text} onChange={(e) => setText(e.target.value)}/></div>
        <div><input type="checkbox" checked={check} onChange={(e) => setCheck(e.target.checked)} />Toggle</div>
        <div><button onClick={() => submitForm()}>Submit</button></div>
      </form>
    </>
  )
}
