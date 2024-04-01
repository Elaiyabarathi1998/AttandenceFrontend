
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import SweetAlert from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import './progressbar.css'
import Demo from './todo';
// import PieChartWithCenterLabel from './performance';
// import ProgressBarWithSeparators from './performance';



export const EmployeeProfile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const { userDetails } = useAuth();
  const navigate = useNavigate();

  if (!userDetails) {
    // User data not available, show SweetAlert
    SweetAlert.fire({
      title: 'Profile Not Found',
      text: 'Please contact the admin to create your profile.',
      icon: 'warning',
    }).then((result) => {
      // Check if the user clicked "OK"
      if (result.isConfirmed) {
        // Navigate to the 'signin' path
        navigate('/signin'); // Make sure to import useNavigate or useHistory as needed
      }
    });

    // For now, return a loading state
    return <p>Contact Your Admin Team</p>;
  }









  return (
    <div
      style={{
        position: 'absolute',
        left: '210px',
        bottom: '20px',
        width: 'calc(98% - 210px)',
        height: '82%',
        backgroundColor: '#d9d9d9',
        borderRadius: '6px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        marginTop: '15px',
      }}
    >

      <Card style={{ margin: '10px' }}>
        <Card.Body >
          <div style={{ display: 'flex' }}>
            <div>
              <Box style={{ backgroundColor: '#b4c5e4', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <h2>Logged Profile</h2>
                <p>Username: <strong>{userDetails.userData.username}</strong> </p>

                {/* Display other user-related information */}

                {/* If you have employee data */}
                {userDetails.employeeData && (
                  <div>
                    <h2>Employee Profile</h2>
                    <p>Position: {userDetails.employeeData.position}</p>
                    <p>Rate: {userDetails.employeeData.rate}</p>
                    <p>Email: {userDetails.userData.email}</p>
                    {/* Display other employee-related information */}
                    <p>Address: {userDetails.employeeData.address}</p>
                    <p>Contact: {userDetails.employeeData.contact}</p>
                    <p>Date of Birth: {userDetails.employeeData.DOB}</p>
                    <p>Status: {userDetails.employeeData.status}</p>

                  </div>
                )}
              </Box>
            </div>
            <div style={{ marginLeft: '60px' }}>
              <Box style={{ width: 700, height: 300, backgroundColor: '#b4c5e4', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: "space-evenly", alignItems: "center" }}>

                  <div style={{ marginTop: "35px" }}>
                    <strong>Attandance</strong>
                    <Box style={{ width: 200, height: 200, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <div className="row d-flex">

                        <div className="col-md-6">

                          <div className="progress blue">
                            <span className="progress-left">
                              <span className="progress-bar"></span>
                            </span>
                            <span className="progress-right">
                              <span className="progress-bar"></span>
                            </span>
                            <div className="progress-value">90%</div>
                          </div>

                        </div>

                      </div>
                    </Box>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <strong>Performance</strong>
                    <Box style={{ width: 200, height: 200, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <div className="row d-flex">

                        <div className="col-md-6">

                          <div className="progress blue">
                            <span className="progress-left">
                              <span className="progress-bar"></span>
                            </span>
                            <span className="progress-right">
                              <span className="progress-bar"></span>
                            </span>
                            <div className="progress-value">65%</div>
                          </div>

                        </div>

                      </div>
                    </Box>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <strong>Efficiency</strong>
                    <Box style={{ width: 200, height: 200, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <div className="row d-flex">

                        <div className="col-md-6">
                        <div className="progress blue">
                            <span className="progress-left">
                              <span className="progress-bar"></span>
                            </span>
                            <span className="progress-right">
                              <span className="progress-bar"></span>
                            </span>
                            <div className="progress-value">59%</div>
                          </div>
                        </div>

                      </div>
                    </Box>
                  </div>
                </div>
              </Box>
              <Button
                sx={{
                  marginTop: '10px',
                  color: 'white',
                  backgroundColor: '#0077b6',
                  '&:hover': {
                    backgroundColor: '#25d366',
                  },
                }}
                onClick={handleOpenDialog}
              >
                <AddIcon /> Todo List
              </Button>
              <Dialog open={open} onClose={handleCloseDialog} sx={{ maxWidth: 'xl' }}>
                <DialogTitle>Todo List</DialogTitle>
                <DialogContent>
                  <Demo />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Card.Body>

      </Card>


    </div>
  );
};
