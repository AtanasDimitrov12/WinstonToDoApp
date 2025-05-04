import React, { useState } from 'react';
import { useGlobalState, GlobalState } from '../context/GlobalStateProvider';
import {
  TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList() {
  const { todos } = useGlobalState();
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const addTodo = () => {
    if (!task.trim()) return;
    const newTodo = { id: Date.now(), text: task, completed: false };
    GlobalState.set({ todos: [...todos, newTodo] });
    setTask('');
  };

  const toggleTodo = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    GlobalState.set({ todos: updated });
  };

  const deleteTodo = (id) => {
    const updated = todos.filter(todo => todo.id !== id);
    GlobalState.set({ todos: updated });
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = () => {
    const updated = todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editedText } : todo
    );
    GlobalState.set({ todos: updated });
    setEditingId(null);
    setEditedText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  };

  return (
    <div>
      <h2>My TODO List</h2>
      <TextField
        label="New Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button onClick={addTodo} variant="contained" sx={{ mt: 2, mb: 2 }}>
        Add Task
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} secondaryAction={
            <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {editingId === todo.id ? (
              <TextField
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={handleKeyDown}
                autoFocus
                fullWidth
              />
            ) : (
              <ListItemText
                primary={todo.text}
                onClick={() => startEditing(todo.id, todo.text)}
                sx={{ 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
