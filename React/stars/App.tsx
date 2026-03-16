import {useState} from 'react'
import React from 'react'
import './App.css'

export default function App() {
  const stars = document.getElementsByClassName('star') as HTMLCollectionOf<HTMLElement>
  const starCount = stars.length

  const [score, setScore] = useState(0)

  function handleClick(n : number) {
    if (n === 1 && score === 1) {
      setScore(0)
      clearStars()
    } else {
      setScore(n)
      drawStars(n, 'red')
    }
  }

  function drawStars(n : number, color: string) {
    for (let i = 0; i < n; ++ i) {
      stars[i].style.color = color;
    }
  }

  function clearStars() {
    drawStars(starCount, '')
  }

  function handleEnter(n : number) {
    clearStars()
    drawStars(n, 'orange')
  }

  function handleLeave(n : number) {
    clearStars()
    drawStars(score, 'red')
  }

  function createStars(n = 5) {
    const stars = []
    for (let i = 1; i <= n; ++ i) {
      stars.push(<span key={i} 
        onClick={() => handleClick(i)} 
        onMouseEnter={() => handleEnter(i)} 
        onMouseLeave={() => handleLeave(i)} 
        className="star">&#9733;</span>)
    }
    return stars
  }

  return (
    <div className="star-panel">
     {createStars(10)}
    </div>
  )
}
