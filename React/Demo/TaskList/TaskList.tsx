// Task List: add, delete, mark as completed.
// useRef, useState. Splice.

import React, {useState, useRef} from 'react'
import './App.css'

export default function App() {
  const [toDoList, setToDoList] = useState(['Task 1', 'Task 2'])
  const inputRef = useRef<HTMLInputElement>(null)

  const deleteTask = (index : number) => {
    const newToDoList = [... toDoList]
    newToDoList.splice(index, 1)
    setToDoList(newToDoList)
  }

  const createToDoList = () => {
    const tasks = []
    for (let i = 0; i < toDoList.length; ++ i) {
      tasks.push(
        <div key={i}>
          <input type="checkbox" title="Completed" />
          {toDoList[i]}
          <button onClick={() => deleteTask(i)}>Delete</button>
        </div>
      )
    }
    return tasks
  }

  const addTask = () => {
    const newToDoList = [...toDoList]
    const text = inputRef.current.value.trim()
    if (text === '') {
      alert('input value is empty')
      return
    }
    newToDoList.push(text)
    setToDoList(newToDoList)
    inputRef.current.value = ''
  }

  return (
    <>
      <div style={{paddingTop: '20px'}}>
        <input type="text" ref={inputRef} />
        <button onClick={() => addTask()}>Add Task</button>
      </div>
      <div style={{width: '200px', textAlign: 'left', margin: 'auto'}}>
        {createToDoList()}
      </div>
    </>
  )
}
