// Demo.tsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface TodoItem {
  name: string;
  _id: string;
}

interface DemoProps {}

function Demo(props: DemoProps) {
  const [name, setName] = useState<string>('');
  const [namesList, setNamesList] = useState<TodoItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchTodoList();
    setIsVisible(true);
  }, [namesList]);

  const fetchTodoList = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/category/todo');
      if (response.ok) {
        const todoList = await response.json();
        setNamesList(todoList);
      } else {
        console.error(
          'Failed to fetch todo list. Server returned:',
          response.status
        );
        // Handle error cases here
      }
    } catch (error) {
      console.error('Error fetching todo list:', error);
      // Handle network errors here
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCreate = async () => {
    if (name) {
      try {
        const response = await fetch('http://localhost:8081/api/category/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });

        if (response.ok) {
          const newItem = await response.json();
          setNamesList([...namesList, newItem]);
          setName('');
        } else {
          console.error(
            'Failed to create todo list. Server returned:',
            response.status
          );
          // Handle error cases here
        }
      } catch (error) {
        console.error('Error creating todo list:', error);
        // Handle network errors here
      }
    }
  };

  const handleDelete = async (id: string, index: number) => {
    try {
      const response = await fetch(`http://localhost:8081/api/category/todo/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNamesList((prevList) => prevList.filter((_, i) => i !== index));
        setEditingIndex(null);
      } else {
        console.error(
          'Failed to delete todo list. Server returned:',
          response.status
        );
        // Handle error cases here
      }
    } catch (error) {
      console.error('Error deleting todo list:', error);
      // Handle network errors here
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setName(namesList[index].name);
  };

  const handleSaveEdit = async () => {
    if (editingIndex !== null && name) {
      try {
        const response = await fetch(`http://localhost:8081/api/category/todo/${namesList[editingIndex]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });

        if (response.ok) {
          const updatedTodo = await response.json();
          setNamesList((prevList) => {
            const newList = [...prevList];
            newList[editingIndex] = updatedTodo;
            return newList;
          });
          setEditingIndex(null);
          setName('');
        } else {
          console.error(
            'Failed to update todo list. Server returned:',
            response.status
          );
          // Handle error cases here
        }
      } catch (error) {
        console.error('Error updating todo list:', error);
        // Handle network errors here
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Box
          className={`fade-in ${isVisible ? 'visible' : ''}`}
          style={{
            backgroundColor: '#dcfec6',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
            padding: '20px',
            borderRadius: '5px',
            width: '600px',
            fontFamily: 'sans-serif',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <Typography
            variant="h6"
            style={{
              backgroundColor: '#deeaee',
              padding: '8px',
              color: '#034f84',
              textAlign: 'start',
              borderRadius: '5px',
              fontFamily: 'sans-serif',
            }}
          >
            Add Notes
          </Typography>
          <TextField
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            sx={{
              width: '100%',
              height: '40px',
              marginBottom: '20px',
            }}
          />
          {editingIndex !== null ? (
            <Button
              variant="contained"
              onClick={handleSaveEdit}
              sx={{
                marginRight: 'auto',
                backgroundColor: '#25d366',
                color: 'white',
                width: '150px',
                height: '30px',
              }}
            >
              Save Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                marginRight: 'auto',
                color: 'white',
                backgroundColor: '#0077b6',
                '&:hover': {
                  backgroundColor: '#25d366',
                },
                width: '150px',
                height: '30px',
              }}
            >
              Create
            </Button>
          )}
        </Box>
      </div>
      <div>
        <Box
          sx={{
            padding: '10px',
            marginLeft: '25%',
            marginRight: '25%',
          }}
        >
          <ul
            style={{
              listStyleType: 'none',
              padding: '5px',
              backgroundColor: 'none',
              borderRadius: '5px',
              border: 'none',
              paddingLeft: '10px',
            }}
          >
            {namesList.map((item, index) => (
              <li
                key={item._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '10px',
                  margin: '10px',
                  border: '2px solid grey',
                  borderRadius: '4px',
                  fontFamily: 'sans-serif',
                  padding: '15px',
                }}
              >
                <div>{item.name}</div>
                <IconButton
                  onClick={() => handleEdit(index)}
                  aria-label="Edit"
                  sx={{
                    marginLeft: 'auto',
                    color: '#0077b6',
                    '&:hover': {
                      color: '#fff',
                      backgroundColor: '#25d366',
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(item._id, index)}
                  aria-label="Delete"
                  sx={{
                    marginLeft: '10px',
                    color: '#0077b6',
                    '&:hover': {
                      color: 'red',
                      backgroundColor: '#25d366',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </Box>
      </div>
    </>
  );
}

export default Demo;
