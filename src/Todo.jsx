import React, { useState } from 'react';

function Todo({ todo, onDelete, onEdit, onUpdateStatus }) {
  const [status, setStatus] = useState(todo.status);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdateStatus(todo.id, newStatus);
    setDropdownOpen(false);
  };

  const handleEditClick = () => {
    onEdit(todo.id);
  };

  return (
    <div className="col-lg-4">
    <div class="card text-bg-success mb-3" style={{width:"18rem"}}>
    <div className="card-body">
          <h5 className="card-title mb-2 text-muted">Task Name: {todo.taskName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Description: {todo.description}</h6>
          <div className="form-group">
            <label>Status:</label>
            <div className={`dropdown${isDropdownOpen ? ' show' : ''}`}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="statusDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                {status}
              </button>
              <div className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`} aria-labelledby="statusDropdown">
                <button className="dropdown-item" onClick={() => handleStatusChange('Not Completed')}>
                  Not Completed
                </button>
                <button className="dropdown-item" onClick={() => handleStatusChange('Completed')}>
                  Completed
                </button>
              </div>
            </div>
          </div>
          <div className="btn-group" role="group" aria-label="Todo Actions">
            <button type="button" className="btn btn-primary" onClick={handleEditClick}>
              Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    
    );
    
}

export default Todo;
