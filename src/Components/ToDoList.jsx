import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import '../App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1); 
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, date: new Date(), done: false }]);
      setNewTask('');
    }
  };

  const markDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = true;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index].text);
  };

  const saveEditedTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = newTask;
      setTasks(updatedTasks);
      setEditIndex(-1);
      setNewTask('');
    }
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      {editIndex !== -1 ? (
        <>
          <button onClick={saveEditedTask}>Save</button>
          <button onClick={() => setEditIndex(-1)}>Cancel</button>
        </>
      ) : (
        <button onClick={addTask}>Add Task</button>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? 'done' : ''}>
            {editIndex === index ? (
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                
              />
            ) : (
              <>
                {task.text} ({task.date.toISOString().split('T')[0]})
                {!task.done ? (
                  <>
                    <button onClick={() => markDone(index)}>Mark Done</button>
                  
                    <FontAwesomeIcon icon={faPen} onClick={() => editTask(index)}/>
                  </>
                ) : ( <FontAwesomeIcon icon={faCircleCheck} />)}
                 <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteTask(index)}/>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
