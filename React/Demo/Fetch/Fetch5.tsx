// Use a "Load More" button at the bottom. Load one page each time.
import React, {useState, useEffect} from 'react'
import './App.css'

export default function App() {
  const [dataList, setDataList] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchData = async (page: number) => {
    // console.log(`page = ${page}`)
    setLoading(true)
    const resp = await fetch(`https://api.disneyapi.dev/character?page=${page}`)
    const json = await resp.json()
    // console.log(json)
    setTotalPages(json.info.totalPages)

    const startIndex = dataList.length
    const list = json.data.map((item: any, index: number) => (
      <tr key={startIndex + index + 1}>
        <td style={{width: '10px'}}>{startIndex + index + 1}</td>
        <td style={{width: '300px', textAlign: 'left'}}>{item.name}</td>
        <td><img src={item.imageUrl} style={{width: '100px'}} /></td>
      </tr>
    ))
    setDataList(prev => [...prev, ...list])
    setPage(prev => prev + 1)
    setLoading(false)
  }

  const loadNextPage = () => {
    fetchData(page)
  }

  useEffect(() => {
    if (! loading) {
      fetchData(page)
    }
  }, []) // only load once at the page start.

  return (
    <table style={{margin: 'auto'}}>
      <thead>
        <tr><td colSpan={3}><h3>Disney Catoons</h3></td></tr>
      </thead>
      <tbody>
        {dataList}
        <tr><td colSpan={3}>
          <button onClick={() => loadNextPage()} >Load More </button>
        </td></tr>
      </tbody>
    </table>
  )
}
