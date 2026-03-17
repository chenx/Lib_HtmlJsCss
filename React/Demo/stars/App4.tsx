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

  return (
    <div className="star-panel">
      {Array.from({ length: count }, (_, i) => {
        const star = i + 1
        const active = hover || rating

        return (
          <span
            key={star}
            className="star"
            style={{ color: star <= active ? "gold" : "#ccc", cursor: "pointer", fontSize: "30px" }}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}
