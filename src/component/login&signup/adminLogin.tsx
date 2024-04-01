import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Username icon
import LockIcon from '@mui/icons-material/Lock'; // Password icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import outletSign from './out_2.gif';
import { useNavigate } from 'react-router-dom';


import { useAuth } from '../context/context';


export const AdminLogin = () => {
  const backgroundStyle = {
    backgroundColor: '#5FD068',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const [showPassword, setShowPassword] = useState(false);
  const [passwordField, setPasswordField] = useState('password');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordField(showPassword ? 'password' : 'text');
  };
  
   const  { adminLogin }  = useAuth();

  //  const gotoUserDashboard = () => {
  //   navigate('/employeedashboard')
  //  }

   const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     if (name === 'loginUsername') {
       setLoginUsername(value);
     } else if (name === 'loginPassword') {
       setLoginPassword(value);
     }
   };
 
   //create a function for handle login with loginUsername and loginPassword without token
   const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
     // try {
 
       e.preventDefault();
      //  if (auth) {
         try {
           await adminLogin(loginUsername, loginPassword);
           console.log("successfully logedin",loginUsername);
           // console.log(auth);
           navigate('/admindashboard')
         } catch (error) {
           console.log('Login failed.User Please check your credentials.');
         }
      //  }
        }
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
            // width: '350px',
            // height: '350px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <img
            src={outletSign} // Replace with the URL of your GIF
            alt="Animated GIF"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
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
          <Typography variant="h4">Admin Login</Typography>
          <form action="#" onSubmit={handleLoginSubmit} >
          <TextField
            label="Username"
            variant="outlined"
            sx={{width:"90%",marginLeft:"15px"}}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            name='loginUsername'
            value={loginUsername}
            onChange={handleLoginChange}
          />
          <TextField
            label="Password"
            type={passwordField}
            variant="outlined"
            sx={{width:"90%",marginLeft:"15px"}}
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
                    {showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            name='loginPassword'
            value={loginPassword}
            onChange={handleLoginChange}
          />
          <Button variant="contained"  sx={{width:"90%",marginLeft:"15px", color: 'white',
            backgroundColor: '#0077b6',
            '&:hover': {
              backgroundColor: '#25d366',
            },}} type="submit" >
            Login
          </Button>
          </form>
        </div>
        
      </div>
    </div>
  );
};
