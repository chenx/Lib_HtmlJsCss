import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPage = async (pageNumber) => {
    setLoading(true);
    const res = await fetch(`https://api.disneyapi.dev/character?page=${pageNumber}`);
    const json = await res.json();
    setTotalPages(json.info.totalPages);

    // const newRows = json.data.map((item, index) => (
    //   <tr key={item._id}>
    //     <td style={{ width: '10px' }}>{(pageNumber - 1) * json.data.length + index + 1}.</td>
    //     <td style={{ width: '300px' }}>{item.name}</td>
    //     <td><img src={item.imageUrl} style={{ width: '100px' }} /></td>
    //   </tr>
    // ));

    const newRows = []
    const keyStart = dataList.length
    for (let i = 0; i < json.data.length; ++ i) {
      const item = json.data[i]
      newRows.push(
        <tr key={keyStart + i}>
        <td style={{ width: '10px' }}>{(pageNumber - 1) * json.data.length + i + 1}.</td>
        <td style={{ width: '300px' }}>{item.name}</td>
        <td><img src={item.imageUrl} style={{ width: '100px' }} /></td>
      </tr>
      )
    }

    setDataList(prev => [...prev, ...newRows]);
    setLoading(false);

    if (pageNumber < json.info.totalPages) {
    // if (pageNumber < 2) {
      setPage(pageNumber + 1);
    }
  };

  useEffect(() => {
    // if (page > 0 && !loading) {
    if (!loading) {
      fetchPage(page);
    }
  }, [page]);

  return (
    <table style={{ margin: 'auto' }}>
      <tbody>{dataList}</tbody>
    </table>
  );
}
