import React, {useState, useEffect} from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [data, setData] = useState([])
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch('https://api.disneyapi.dev/character')
      const json = await response.json()
      // console.log(json)
      // console.log(json['info'])
      // console.log(json['info']['count'])
      // console.log(json['info']['totalPages'])
      // console.log(json.info.totalPages) // this also works.
      // console.log(json['data'])
      // console.log(json['data'][0]['name'])
      // console.log(json['data'][0]['imageUrl'])
      // setCount(json['info']['count'])
      setTotalPages(json['info']['totalPages'])
      setData(json['data'])
    }

    fetchInfo()
  }, [])

  useEffect(() => {
    const fetchData = async (page : number) => {
        // console.log('page: ' + page)
        const response = await fetch(`https://api.disneyapi.dev/character?page=${page}`)
        const json = await response.json()
        setData(json['data'])
    }

    if (!data || data.length === 0) {
      return 
    }

    const start = count + 1
    // console.log('count = ' + count + ', start = ' + start + ', data.length = ' + data.length)
    const list = [... dataList]
    for (let i = 0; i < data.length; ++ i) {
      list.push(
        <tr key={start+i}>
          <td style={{width: '10px'}}>{start+i}. </td>
          <td style={{width: '300px'}}>{data[i]['name']}</td>
          <td><img src={data[i]['imageUrl']} style={{width: '100px'}}/></td>
        </tr>)
    }
    setCount(count => count + data.length)
    setDataList(list)

    const curPage = page
    setPage(page => page + 1)

    if (curPage < 5) {
      fetchData(curPage + 1)
    }
  }, [data])

  return (
    <>
      <table style={{margin: 'auto'}}>
        <tbody>
          {dataList}
        </tbody>
      </table>
    </>
  )
}
