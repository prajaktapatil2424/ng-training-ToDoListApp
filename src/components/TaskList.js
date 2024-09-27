import React, { useState } from 'react';
import TaskModal from './TaskModal';
import ConfirmationModal from './ConfirmationModal';
import './TaskList.css';  // Import the CSS file

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Example tasks state
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Open the task modal for adding a new task
  const openNewTaskModal = () => {
    setSelectedTask(null); // Set null for new task
    setIsModalOpen(true);
  };

  // Open the task modal for editing a task
  const openModal = (task) => {
    setSelectedTask(task); // Select task for editing
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const openConfirmationModal = (task) => {
    setTaskToDelete(task);
    setIsConfirmOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmOpen(false);
    setTaskToDelete(null);
  };

  const handleDelete = () => {
    const newTasks = tasks.filter(task => task.id !== taskToDelete.id);
    setTasks(newTasks);
    closeConfirmationModal();
  };

  const handleSaveTask = (task) => {
    if (selectedTask) {
      // Edit task
      const updatedTasks = tasks.map(t => (t.id === selectedTask.id ? task : t));
      setTasks(updatedTasks);
    } else {
      // Add new task
      setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    }
    closeModal();
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h1>Tasks</h1>
        <div>
          <button className="new-task-btn" onClick={openNewTaskModal}>New Task</button>
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <div className="actions">
                  <button>⋮</button>
                  <div className="dropdown-content">
                    <a href="#" onClick={() => openModal(task)}>Edit</a>
                    <a href="#" onClick={() => openConfirmationModal(task)}>Delete</a>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <br/> <br/>
      {/* Pagination */}
      <div className="pagination center">
        <button>First</button>
        <button>Prev</button>
        <span>1</span>
        <button>Next</button>
        <button>Last</button>
      </div>

      {/* Task Modal for adding/editing tasks */}
      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onSave={handleSaveTask}
          onClose={closeModal}
        />
      )}

      {/* Confirmation Modal for deleting tasks */}
      {isConfirmOpen && (
        <ConfirmationModal
          onConfirm={handleDelete}
          onClose={closeConfirmationModal}
        />
      )}
    </div>
  );
};

export default TaskList;
