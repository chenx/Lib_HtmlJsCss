import React, { useState, useRef } from 'react';
import './App.css';

interface Task {
  text: string;
  completed: boolean;
}

export default function App() {
  const [toDoList, setToDoList] = useState<Task[]>([
    { text: 'Task 1', completed: false },
    { text: 'Task 2', completed: false },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    const text = inputRef.current?.value.trim();
    if (!text) {
      alert('Input value is empty');
      return;
    }
    setToDoList(prev => [...prev, { text, completed: false }]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const deleteTask = (index: number) => {
    setToDoList(prev => prev.filter((_, i) => i !== index));
  };

  const toggleCompleted = (index: number) => {
    setToDoList(prev =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <div style={{ paddingTop: '20px' }}>
        <input type="text" ref={inputRef} />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div style={{ width: '250px', textAlign: 'left', margin: 'auto' }}>
        {toDoList.map((task, i) => (
          <div
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? 'orange' : '',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '5px',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(i)}
              title="Completed"
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(i)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
