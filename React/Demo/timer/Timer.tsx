import React, {useState, useEffect} from 'react'
import './App.css'
import Stars from './Stars'
import FizzBuzz from './FizzBuzz'  // can use any name for default export.
import { clearTimeout } from 'timers'

function Timer({curTime}: {curTime: string}) {
  return (
    <div>
      Time: {curTime}
    </div>
  )
}

export default function App() {
  const [curTime, setCurTime] = useState('00:00:00')

  useEffect(() => {
    // let timer = null
    // function updateTime() {
    //   const date = new Date()
    //   const datetime = date.getHours() + ":" +
    //     date.getMinutes() + ":" + date.getSeconds();
    //   setCurTime(datetime)

    //   timer = setTimeout(() => {
    //     updateTime()
    //   }, 1000)
    // }

    // updateTime()

    let interval = setInterval(() => {
      const date = new Date()
      const datetime = date.getHours() + ":" +
      date.getMinutes() + ":" + date.getSeconds();
      setCurTime(datetime)
    }, 1000)

    return () => clearInterval(interval)
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
