import React, { useState } from "react"
import "./App.css"

export default function Stars() {
  const [score, setScore] = useState(0)
  const [hover, setHover] = useState(0)

  const starCount = 10

  function handleClick(n: number) {
    if (n === 1 && score === 1) {
      setScore(0)
    } else {
      setScore(n)
    }
  }

  return (
    <div className="star-panel">
      {Array.from({ length: starCount }, (_, i) => {
        const n = i + 1
        const active = hover ? n <= hover : n <= score

        return (
          <span
            key={n}
            className="star"
            style={{ color: active ? (hover ? "orange" : "red") : "" }}
            onClick={() => handleClick(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733;
          </span>
        )
      })}
    </div>
  )
}
