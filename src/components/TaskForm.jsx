import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'Pending',
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle task addition
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/task/create', newTask);
      // addTask(response.data); // Add the new task to the task list
      setNewTask({ title: '', description: '', due_date: '', status: 'Pending' }); // Clear form
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          placeholder='Title'
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          placeholder='Description'
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          name="due_date"
          value={newTask.due_date}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
