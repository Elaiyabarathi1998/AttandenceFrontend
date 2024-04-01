import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Username icon
import LockIcon from '@mui/icons-material/Lock'; // Password icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email'; // Email icon
import outletadmin from './adminRegister.gif';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export const AdminSignup: React.FC = () => {

  const navigate = useNavigate();
  const backgroundStyle: React.CSSProperties = {
    backgroundColor: '#5FD068',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const [showPassword, setShowPassword] = useState(false);
  const [passwordField, setPasswordField] = useState('password');



  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordField(showPassword ? 'password' : 'text');
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/admin/signup', {
        username,
        email,
        password,
      });
      console.log('AdminSignup successful!');


      if (response.status === 200) {
        toast.success('AdminSignup successful!');
        
        
        // window.location.reload();
        navigate("/adminsignin");
      } else {
        toast.error('Signup failed!');
        console.error('Token not found in the response');
      }
    } catch (error) {
      toast.error('Signup error!');
      console.error('Signup error', error);
    }

    //   if (response.data.token) {
    //     console.log('Signup successful', response.data);
    //     window.location.reload();
    //   } else {
    //     console.error('Token not found in the response');
    //   }
    // } catch (error) {
    //   console.error('Signup error', error);
    // }
  };
  const handleHomeClick = () => {
    // Navigate to the home page
    navigate('/homepage');
  };

  return (
    <div style={backgroundStyle}>
      <div
        style={{
          width: '800px',
          height: '500px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '350px',
            height: '450px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
        style={{ position: 'absolute', top: '10px', left: '10px', color: 'blue' }}
        onClick={handleHomeClick}
      >
        <HomeIcon />
      </IconButton>
          <Typography variant="h4">Admin Register</Typography>
          <TextField
            label="Email"
            variant="outlined"
            sx={{ width: '90%' }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            name="email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            variant="outlined"
            sx={{ width: '90%' }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" >
                  <AccountCircleIcon  />
                </InputAdornment>
              ),
            }}
            name="username"
            value={username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type={passwordField}
            variant="outlined"
            sx={{ width: '90%' }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" 
         sx={{
          marginRight: "20px",
          marginTop: '20px',
          color: 'white',
          backgroundColor: '#0077b6',
          '&:hover': {
              backgroundColor: '#25d366',
          },
      }} onClick={handleSubmit}>
            Register
          </Button>
          
        </div>
        <ToastContainer />
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <img
            src={outletadmin}
            alt="Animated GIF"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
};
