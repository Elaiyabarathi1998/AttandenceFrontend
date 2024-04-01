import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, AppBar, Toolbar, Box, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Swal from 'sweetalert2';

import office1 from './img/office1.png'
import office2 from './img/office2.png'
import office3 from './img/office3.png'
import office4 from './img/office4.png'



const LandingPage = () => {
  const [adminTooltipOpen, setAdminTooltipOpen] = useState(false);
  const [employeeTooltipOpen, setEmployeeTooltipOpen] = useState(false);

  useEffect(() => {
    // Automatically open and close the admin tooltip
    const adminTooltipInterval = setInterval(() => {
      setAdminTooltipOpen(true);
      setTimeout(() => {
        setAdminTooltipOpen(false);
      }, 1000); // Adjust the time as needed (2 seconds in this example)
    }, 4000); // Repeat every 5 seconds (adjust as needed)

    // Automatically open and close the employee tooltip
    const employeeTooltipInterval = setInterval(() => {
      setEmployeeTooltipOpen(true);
      setTimeout(() => {
        setEmployeeTooltipOpen(false);
      }, 2000); // Adjust the time as needed (2 seconds in this example)
    }, 5000); // Repeat every 10 seconds (adjust as needed)

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(adminTooltipInterval);
      clearInterval(employeeTooltipInterval);
    };
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,         // Enable autoplay
    autoplaySpeed: 2000,    // Set the autoplay speed in milliseconds (adjust as needed)
  };
  const navigate = useNavigate();

   const showAdminOptions  = () => {
    Swal.fire({
      title: 'Admin Options',
      showCancelButton: true,
      confirmButtonText: 'Admin Sign Up',
      cancelButtonText: 'Admin Sign In',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/adminsignup');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/adminsignin');
      }
    });
  };

  const showEmployeeOptions = () => {
    Swal.fire({
      title: 'Employee Options',
      showCancelButton: true,
      confirmButtonText: 'Employee Sign Up',
      cancelButtonText: 'Employee Sign In',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/signup');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/signin');
      }
    });
  };
  const appBarStyle = {
    backgroundColor: '#00509d',
  };
  return (
    <Container style={{
      width: '100%', // Set the width as needed
      height: '100vh', // Set the height as needed
    }}>
      
        <AppBar position="static" style={appBarStyle} sx={{ paddingLeft: "50px", width: "100%" }}>
      <Toolbar>
        <Typography variant="h6">Attendance Portal</Typography>
      </Toolbar>
    </AppBar>

    <Grid
      container
      direction="row" // Change direction to "row" to align buttons horizontally
      justifyContent="center"
      alignItems="center"
      spacing={3}
      style={{ minHeight: '90vh', backgroundColor: '#d9d9d9', marginTop: '4px', width: '100%', marginLeft: '0px',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
    > 
     <div style={{display:'flex'}}>
    <div>
     <Grid item xs={12} paddingTop={10}>
        <Typography variant="h3" align="center" gutterBottom data-aos="fade-up" sx={{
    fontWeight: 'bold',
    color: '#0077b6', // Default color
    '&:hover': {
      color: '#00509d', // Hover color
    },
  }}>
          Welcome to Attendance Portal
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="center" paragraph data-aos="fade-up" sx={{
    paddingRight:'100px',
        fontWeight: 'bold',
    color: '#0077b6', // Default color
    '&:hover': {
      color: '#00509d', // Hover color
    },
  }}>
         When people go to work, they shouldn't have to leave their hearts at home.
        </Typography>
      </Grid>
      <div style={{display:'flex',marginLeft: '250px'}}>
      <div>
      <Grid item >
      <Tooltip title="Admin Only" sx={{
    backgroundColor: '#ff5722', // Set your desired background color
    color: 'white',             // Set your desired text color
    borderRadius: '4px',        // Optional: Add border radius for rounded corners
    // Add any other styles as needed
  }} open={adminTooltipOpen} arrow >
        <Button
          variant="contained"
          sx={{
            marginTop: '10px',
            color: 'white',
            backgroundColor: '#0077b6',
            '&:hover': {
              backgroundColor: '#25d366',
            },
          }}
          onClick={showAdminOptions}
          data-aos="fade-up"
        >
          Admin
        </Button>
        </Tooltip>
      </Grid>
      </div>
      <div>
      <Grid item  sx={{marginLeft:'10px'}}>
      <Tooltip title="Employee Only " open={employeeTooltipOpen} arrow>
        <Button
          variant="contained"
          sx={{
            marginTop: '10px',
            color: 'white',
            backgroundColor: '#0077b6',
            '&:hover': {
              backgroundColor: '#25d366',
            },
          }}
          onClick={showEmployeeOptions}
          data-aos="fade-up"
        >
          Employee
        </Button>
        </Tooltip>
      </Grid>
      </div>
      </div>
      </div>

       
      <div style={{padding:'20px'}}>
      <Box style={{ width: 400, height: 400, backgroundColor: '#b4c5e4',borderRadius:'8px',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Slider {...settings}>
        <div>
          {/* Content for Slide 1 */}
          <img src={office1} alt="Slide 1" style={{ width: '100%', height: '100%' ,padding:'20px' ,borderRadius:'8px'}} />
        </div>
        <div>
          {/* Content for Slide 2 */}
          <img src={office2} alt="Slide 2" style={{ width: '100%', height: '100%' ,padding:'20px',borderRadius:'8px'}} />
        </div>
        <div>
          {/* Content for Slide 3 */}
          <img src={office3} alt="Slide 3" style={{ width: '100%', height: '100%' ,padding:'20px',borderRadius:'8px'}} />
        </div>
        <div>
          {/* Content for Slide 4 */}
          <img src={office4} alt="Slide 4" style={{ width: '100%', height: '100%',padding:'20px',borderRadius:'8px' }} />
        </div>
      </Slider>
    </Box>
    </div>
    </div>
    
    </Grid>

    
    


      
    
    </Container>
  );
};

export default LandingPage;
