import React from 'react'

export default function App() {
  return (
    <ol>
      {Array.from({length: 15}, (_, i) => {
          const v = i + 1
          return (
            <li key={i}>
              {
                v % 15 === 0 ? 'FizzBuzz' :
                v % 3 === 0 ? 'Fizz' : 
                v % 5 === 0 ? 'Buzz' :
                String(v)
              }
            </li>
          )}
      )}
    </ol>
  )
}
