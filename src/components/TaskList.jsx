import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTask, setEditingTask] = useState({ title: '', description: '', due_date: '', status: 'Pending' });
    
    // Fetch tasks from the API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/task/get');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, tasks);

    // Handle task deletion
    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://localhost:5000/api/v1/task/delete/${taskId}`);
                setTasks(tasks.filter(task => task.id !== taskId));
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    // Handle editing a task
    const handleEdit = (task) => {
        setIsEditing(true);
        setEditingTask({ ...task });
    };

    // Handle editing task submit
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/v1/task/update/${editingTask.id}`, editingTask);
            setTasks(tasks.map(task => 
                task.id === editingTask.id ? editingTask : task
            ));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Handle input change during editing
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditingTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

      // Handle task status toggle
    const handleToggleStatus = async (taskId, title, currentStatus, due_date, description) => {
        const updatedStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    
        try {
          // Update task status on the backend
          await axios.put(`http://localhost:5000/api/v1/task/update/${taskId}`, { status: updatedStatus, title, due_date, description});
    
          // Update the status in the local state
          setTasks(tasks.map((task) =>
            task.id === taskId ? { ...task, status: updatedStatus, title: title, due_date: due_date, description: description } : task
          ));
        } catch (error) {
          console.error('Error toggling task status:', error);
        }
      };

    return (
        <div>
            <h2>Task List</h2>
            
            {/* Edit Form */}
            {isEditing ? (
                <form onSubmit={handleEditSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editingTask.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={editingTask.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={editingTask.due_date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            name="status"
                            value={editingTask.status}
                            onChange={handleInputChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button type="submit">Save Changes</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : tasks.length === 0 ? ( // Check if tasks array is empty
                <p className='no_task'>No tasks found!</p> // "No tasks found"
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <div className='title_toggle'>
                            <h3 className='title'>{task.title}</h3>
                            <span className='toggle_status'>{task.status}</span>
                            <label class="switch">
                            <input type="checkbox"
                            checked={task.status === 'Completed'} // Check if task is completed
                            onChange={() => handleToggleStatus(task.id, task.title, task.status, task.due_date, task.description)} // Toggle status
                            ></input>
                            <span class="slider round"></span>
                            </label>
                            </div>
                            <p>{task.description}</p>
                            
                            <p>Status: {task.status}</p>
                            <button onClick={() => handleEdit(task)}>Edit</button>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
