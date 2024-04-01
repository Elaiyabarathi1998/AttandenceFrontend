import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Sidenavbar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Dashboard'); // Default active item

  const listItemStyle = (item:string) => ({
    '&:hover': {
      backgroundColor: '#25d366',
      borderRadius: '25px',
      color: '#fff',
    },
    backgroundColor: activeItem === item ? '#34b7f1' : 'inherit',
    borderRadius: '5px',
    color: activeItem === item ? '#fff' : 'inherit',
  });

  const gotoEmployee = () => {
    navigate('/employeedetails');
    setActiveItem('Employee');
  };

  const gotoAttendance = () => {
    navigate('/attendance');
    setActiveItem('Attendance');
  };

  const gotoPayroll = () => {
    navigate('/payroll');
    setActiveItem('Payroll');
  };

  const gotoTimelog = () => {
    navigate('/timelog');
    setActiveItem('Time Log');
  };

  const gotoAdminDashboard = () => {
    navigate('/admindashboard');
    setActiveItem('Dashboard');
  };

  return (
    <>
      <Box
        sx={{
          width: '200px',
          height: '90vh',
          backgroundColor: '#fff',
          border: '2px solid grey',
          position: 'sticky',
          top: '0',
        }}
      >
        <br />
        <List>
          <ListItem button sx={listItemStyle('Dashboard')} onClick={gotoAdminDashboard}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1" >
                Dashboard
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button sx={listItemStyle('Employee')} onClick={gotoEmployee}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1">
                Employee
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button sx={listItemStyle('Attendance')} onClick={gotoAttendance}>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1" >
                Attendance
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button sx={listItemStyle('Time Log')} onClick={gotoTimelog}>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1" >
                Request Query
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button sx={listItemStyle('Payroll')} onClick={gotoPayroll}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1">Payroll</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </>
  );
};
