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

    const list = []
    const start = dataList.length;
    for (let i = 0; i < json.data.length; ++ i) {
      const index = start + i + 1
      list.push(
        <tr key={index}>
          <td style={{width: '10px'}} >{index}.</td>
          <td style={{width: '300px'}} >{json.data[i].name}</td>
          <td><img src={json.data[i].imageUrl} style={{width: '100px'}} /></td>
        </tr>
      )
    }
    setDataList([...dataList, ...list])
    setLoading(false)

    // if (page < totalPages) {
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
