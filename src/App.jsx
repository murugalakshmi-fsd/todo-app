import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('All');
  const [editTodoId, setEditTodoId] = useState(null);

  const addTodo = () => {
    if (newTaskName.trim() === '' || newDescription.trim() === '') {
      alert('Task name and description cannot be empty.');
      return;
    }

    if (editTodoId !== null) {

      const updatedTodos = todos.map((todo) =>
        todo.id === editTodoId
          ? { ...todo, taskName: newTaskName, description: newDescription }
          : todo
      );
      setTodos(updatedTodos);
      setNewTaskName('');
      setNewDescription('');
      setEditTodoId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        taskName: newTaskName,
        description: newDescription,
        status: 'Not Completed',
      };
      setTodos([...todos, newTodo]);
      setNewTaskName('');
      setNewDescription('');
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setNewTaskName(todoToEdit.taskName);
    setNewDescription(todoToEdit.description);
    setEditTodoId(id);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setEditTodoId(null); 
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const renderTodos = (todos) => {
    return (
      <div className="row">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onUpdateStatus={updateStatus}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container p-5">
      <div className="row text-center"><h3 style={{ color: "greenyellow" }}>MY Todo</h3></div>
      <div className="row mb-3">
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            placeholder="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </div>
        <div className="col-5">
          <input
            type="text"
            className="form-control --bs-success-border-subtle"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button className="btn btn-success" onClick={addTodo}>
            AddTodo
          </button>
        </div>
      </div>

      
      <div className="row mb-3">
        <div className="col-6">
          <h4>My Todos</h4>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-3">
              <label className="mr-2">Filter Status:</label>
            </div>
            <div className="col-3">
              <select
                className="form-select-color" style={{ color: 'pink' }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {renderTodos(
            filter === 'All'
              ? todos
              : filter === 'Completed'
                ? todos.filter((todo) => todo.status === 'Completed')
                : todos.filter((todo) => todo.status === 'Not Completed')
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
