import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';
const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/task/get');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, tasks);

  return (
    <div>
      <h1>Task Management System</h1>
      <TaskForm/>
      <TaskList tasks={tasks} fetchTasks={fetchTasks}/>
      
    </div>
  );
};

export default App;
