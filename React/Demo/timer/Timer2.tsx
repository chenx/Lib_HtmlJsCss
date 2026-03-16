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
  const intervalRef = useRef(null) // prevents multiple timers

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const date = new Date()
      const datetime = date.getHours() + ":" +
      date.getMinutes() + ":" + date.getSeconds();
      setCurTime(datetime)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  })

  return (
    <>
      <Timer curTime={curTime}/>
      <div>{curTime}</div>
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
