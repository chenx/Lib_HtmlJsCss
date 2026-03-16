import {useState} from 'react'
import React from 'react'
import './App.css'

// Method 1: direct DOM manipulation.
function addFizzBuzz(n = 20) {
  const ol = document.getElementById('contentList')
  ol.replaceChildren()
  for (let i = 1; i <= n; ++ i) {
    const li = document.createElement('li');
    li.textContent = i % 15 === 0 ? 'FizzBuzz' :
      i % 3 === 0 ? 'Fizz' :
      i % 5 === 0 ? 'Buzz' :
      '' + i
    ol.appendChild(li)
  }
}

addFizzBuzz(3);

// Method 2: React declarative rendering.
export default function App() {
  const createFizzBuzz = (n : number = 15) => {
  // function createFizzBuzz(n = 20) {
    const list = []
    for (let i = 1; i <= n; ++ i) {
      const text = i % 15 === 0 ? 'FizzBuzz' :
        i % 3 === 0 ? 'Fizz' :
        i % 5 === 0 ? 'Buzz' :
        '' + i
      list.push(<li key={i}>{text}</li>)
    }
    return list
  }
  return (
    <ol>
      {createFizzBuzz()}
    </ol>
  )
}

