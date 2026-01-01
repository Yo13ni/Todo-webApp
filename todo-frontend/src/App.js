import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [formError, setFormError] = useState(null);

  // Fetch todos from API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(`Cannot connect to API: ${err.message}. Make sure backend is running on http://localhost:3000`);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) {
      setFormError('Please enter a todo title');
      return;
    }

    setFormError(null); // Clear previous form errors

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo.title,
          description: newTodo.description,
          completed: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `Failed to create todo: ${response.status}`);
      }

      const createdTodo = await response.json();
      setTodos([...todos, createdTodo]);
      setNewTodo({ title: '', description: '' });
      setFormError(null); // Clear form errors on success
      setError(null); // Clear any previous errors
    } catch (err) {
      setFormError(`Failed to create todo: ${err.message}`);
      setError(`Error: ${err.message}. Make sure the backend is running on http://localhost:3000`);
      console.error('Error creating todo:', err);
    }
  };

  const handleToggleExpand = (id, e) => {
    e.stopPropagation();
    const newExpandedIds = new Set(expandedIds);
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id);
    } else {
      newExpandedIds.add(id);
    }
    setExpandedIds(newExpandedIds);
  };

  const handleToggleComplete = async (id, currentStatus) => {
    // Don't toggle if editing
    if (editingId === id) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !currentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      setError(err.message);
      console.error('Error updating todo:', err);
    }
  };

  const handleEditStart = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.title);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleEditSave = async (id) => {
    if (!editText.trim()) {
      alert('Todo title cannot be empty');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editText.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
      setEditingId(null);
      setEditText('');
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting todo:', err);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        {/* Header */}
        <header className="main-header">
          <h1 className="main-title">Just do it.</h1>
        </header>

        {/* Create Todo Form */}
        <section className="add-todo-section">
          <form onSubmit={handleCreateTodo} className="add-todo-form">
            <input
              type="text"
              placeholder="Todo title"
              value={newTodo.title}
              onChange={(e) => {
                setNewTodo({ ...newTodo, title: e.target.value });
                setFormError(null); // Clear error when user types
              }}
              className={`add-todo-input ${formError ? 'input-error' : ''}`}
              autoFocus
            />
            {formError && (
              <div className="form-error-message">
                ⚠️ {formError}
              </div>
            )}
            <textarea
              placeholder="Add description (optional)"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="add-todo-description"
              rows="3"
            />
            <button type="submit" className="add-todo-btn">
              Add Todo
            </button>
          </form>
        </section>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your todos...</p>
          </div>
        ) : (
          <>
            {/* Todo Counter */}
            <div className="todo-counter">
              {todos.length} {todos.length === 1 ? 'todo' : 'todos'}, {currentTime}
            </div>

            {/* Todos List */}
            {todos.length === 0 ? (
              <div className="empty-state">
                <p className="empty-text">No tasks yet. Start by adding one above!</p>
              </div>
            ) : (
              <div className="todos-list">
                {todos.map((todo) => (
                  <div
                    key={todo._id}
                    className={`todo-item ${todo.completed ? 'completed' : ''} ${editingId === todo._id ? 'editing' : ''}`}
                    onClick={() => !editingId && handleToggleComplete(todo._id, todo.completed)}
                  >
                    {editingId === todo._id ? (
                      // Edit Mode
                      <div className="edit-mode" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleEditSave(todo._id);
                            } else if (e.key === 'Escape') {
                              handleEditCancel();
                            }
                          }}
                          className="edit-input"
                          autoFocus
                        />
                        <div className="edit-actions">
                          <button
                            onClick={() => handleEditSave(todo._id)}
                            className="save-btn"
                            title="Save (Enter)"
                          >
                            ✓
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="cancel-btn"
                            title="Cancel (Esc)"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display Mode
                      <>
                        <div className="todo-content">
                          <span className="todo-checkbox">
                            {todo.completed ? '✓' : '○'}
                          </span>
                          <span className="todo-text">{todo.title}</span>
                          <button
                            onClick={(e) => handleToggleExpand(todo._id, e)}
                            className="expand-btn"
                            title={expandedIds.has(todo._id) ? 'Hide details' : 'Show details'}
                          >
                            {expandedIds.has(todo._id) ? '▼' : '▶'}
                          </button>
                        </div>
                        <div className="todo-actions-group">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStart(todo);
                            }}
                            className="edit-btn"
                            title="Edit todo"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTodo(todo._id);
                            }}
                            className="delete-btn"
                            title="Delete todo"
                          >
                            ×
                          </button>
                        </div>
                      </>
                    )}
                    {/* Expanded Details */}
                    {expandedIds.has(todo._id) && editingId !== todo._id && (
                      <div className="todo-details" onClick={(e) => e.stopPropagation()}>
                        <div className="detail-section">
                          {todo.description ? (
                            <div className="detail-item">
                              <span className="detail-label">Description:</span>
                              <span className="detail-value">{todo.description}</span>
                            </div>
                          ) : (
                            <div className="detail-item">
                              <span className="detail-placeholder">No description</span>
                            </div>
                          )}
                        </div>
                        <div className="detail-section">
                          <div className="detail-item">
                            <span className="detail-label">Status:</span>
                            <span className={`detail-value status ${todo.completed ? 'completed' : 'pending'}`}>
                              {todo.completed ? '✓ Completed' : '○ Pending'}
                            </span>
                          </div>
                        </div>
                        <div className="detail-section">
                          <div className="detail-item">
                            <span className="detail-label">Created:</span>
                            <span className="detail-value">{formatDate(todo.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
