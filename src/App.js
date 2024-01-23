import './App.css'
import Form from './components/Form';
import { useEffect, useState } from 'react';
import Task from './components/Task';
import List from './components/List';

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (tasks.length === 0) return
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(tasks)
    
  }, [])

  function addTask(task) {
    if (!task.text || /^\s*$/.test(task.text)) {
      return
    }
    setTasks(prev => {
      return [...prev, {name: task.text, done: false}]
    })
  }

  function updateTask(index, done) {
    setTasks(prev => {
      return prev.map((task, i) => {
        if (i === index) {
          return {...task, done}
        }
        return task
      })
    })
  }

  function onEdit(index, newName) {
    setTasks(prev => {
      return prev.map((task, i) => {
        if (i === index) {
          return {...task, name: newName}
        }
        return task
      })
    })
  }

  function removeTask(index) {
    setTasks(prev => {
      const updatedTasks = [...prev]
      updatedTasks.splice(index, 1)
      return updatedTasks
    })
  }

  return (
    <main>
      <List />
      <Form onAdd={addTask}/>
      {tasks.map((task, index )=> (
        <Task 
          key={index} 
          {...task} 
          onToggle={done => updateTask(index, done)} 
          onEdit={newName => onEdit(index, newName)}
          onRemove={() => removeTask(index)}/>
      ))}
    </main>
  );
}

export default App;
