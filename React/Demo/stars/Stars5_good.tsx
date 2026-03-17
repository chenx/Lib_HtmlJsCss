import React, { useState } from "react"
import "./App.css"

type StarsProps = {
  count?: number
}

export default function Stars({ count = 5 }: StarsProps) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  function handleClick(n: number) {
    setRating(prev => (prev === n ? 0 : n))
  }

  const createStars = (n = 5) => {
    const stars = []
    for (let i = 1; i <= n; ++ i) {
        const active = hover ? i <= hover : i <= rating

        stars.push(
          <span
            key={i}
            className="star"
            style={{ color: active ? (hover ? "orange" : "red") : "" }}
            onClick={() => handleClick(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733;
          </span>
        )
      }
    return stars
  }

  return (
    <div className="star-panel">
      {createStars()}
    </div>
  )
}
