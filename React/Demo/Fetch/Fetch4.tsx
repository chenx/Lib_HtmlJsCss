import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [dataList, setDataList] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchPage = async (page : number) => {
    setLoading(true)
    const response = await fetch(`https://api.disneyapi.dev/character?page=${page}`)
    const json = await response.json()
    // console.log(json.info.totalPages)
    setTotalPages(json.info.totalPages)

    const start = dataList.length;
    const list = json.data.map((item, i) => {
      return (
        <tr key={start + i + 1}>
          <td style={{width: '10px'}} >{start + i + 1}.</td>
          <td style={{textAlign: 'left', width: '300px'}} >{item.name}</td>
          <td><img src={item.imageUrl} style={{width: '100px'}} /></td>
        </tr>
      )
    })

    setDataList(prev => [...prev, ...list])
    setLoading(false)

    // if (page < json.info.totalPages) {
    if (page < 3) {
      setPage(page => page + 1)
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchPage(page)
    }
  }, [page])


  return (
    <table style={{margin: 'auto'}}>
      <tbody>
        {dataList}
      </tbody>
    </table>
  )
}
