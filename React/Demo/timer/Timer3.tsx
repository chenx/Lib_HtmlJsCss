import React, {useEffect, useRef, useState} from 'react'

export default function App() {
  const [curTime, setCurTime] = useState('00:00:00')
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const date = new Date()
      setCurTime(date.toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  })
  
  return (
    <>
      <div>Time: {curTime}</div>
    </>
  )
}
