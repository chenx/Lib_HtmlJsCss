import React, {useRef} from 'react'
import './App.css'

export default function App() {
  const dialogRef = useRef(null)

  return (
    <div style={{margin: 'auto', textAlign: 'center'}}>
      <div className="app">
        <dialog id="dialog" ref={dialogRef}>
          <h2>Modal Title</h2>
          <p>This is the content of the modal.</p>
          <button id="close-modal" onClick={() => dialogRef.current?.close()}>Close</button>
        </dialog>
      </div>
      <button id="open-modal" onClick={() => dialogRef.current?.showModal()}>Open Modal</button>
    </div>
  )
}
