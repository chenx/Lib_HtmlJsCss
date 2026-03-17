import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import Stars from './Stars'
import FizzBuzz from './FizzBuzz'

function Timer({curTime}: {curTime: string}) {
  return (
    <div>
      Time: {curTime}
    </div>
  )
}

function TimerApp() {
  const [curTime, setCurTime] = useState('00:00:00')
  const [running, setRunning] = useState(true)
  const [btnText, setBtnText] = useState('Stop Timer')
  const intervalRef = useRef(null) // prevents multiple timers

  useEffect(() => {
    if (! running) {
      return
    }

    intervalRef.current = setInterval(() => {
      setCurTime(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running])

  const toggleRunning = () => {
    setBtnText(running ? 'Run Timer' : 'Stop Timer')
    setRunning(running => ! running)
  }

  return (
    <>
      <Timer curTime={curTime}/>
      <div>{curTime}</div>
      <button onClick={() => toggleRunning()}>{btnText}</button>
      <Stars/>
      <FizzBuzz/>
    </>
  )
}

export default function App() {
  return (
    <TimerApp />
  )
}
