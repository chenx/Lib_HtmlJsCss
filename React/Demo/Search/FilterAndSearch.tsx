import React, {useState} from 'react'
import './App.css'

function App() {
  const [searchResult, setSearchResult] = useState([])

  const items = [
    'a', 'aa','aaa', 'aab', 'bb', 'aabbc', 'cc', 'd'
  ]

  const search = (value: string) => {
    if (value === '') {
      setSearchResult([])
      return
    }

    const result =
      items.filter((item) => (
        item.indexOf(value) >= 0
      )).map((value, index) => (
        <li key={index}>{value}</li>
      ))
    setSearchResult(result)
  }

  return (
    <div className="app">
      <input type="text" onChange={(e) => search(e.target.value.trim())} style={{width: '400px', margin: 'auto'}} />
      <div>
        <ul>
          {searchResult}
        </ul>
      </div>
    </div>
  )
}

export default App
