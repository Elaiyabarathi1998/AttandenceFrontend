import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface UserSidenavbarProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}

const UserSidenavbar: React.FC<UserSidenavbarProps> = ({ setActiveComponent }) => {
  const [activeItem, setActiveItem] = useState('Dashboard'); // Default active item

  const listItemStyle = (item: string) => ({
    '&:hover': {
      backgroundColor: '#25d366',
      borderRadius: '25px',
      color: '#fff',
    },
    backgroundColor: activeItem === item ? '#34b7f1' : 'inherit',
    borderRadius: '5px',
    color: activeItem === item ? '#fff' : 'inherit',
  });

  return (
    <>
      <div>
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
          <List>
            <ListItem
              button
              onClick={() => {
                setActiveComponent('EmployeeProfile');
                setActiveItem('Dashboard');
              }}
              sx={listItemStyle('Dashboard')}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1">User Dashboard</Typography>
              </ListItemText>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setActiveComponent('TimeRegister');
                setActiveItem('Time Log');
              }}
              sx={listItemStyle('Time Log')}
            >
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1">Time Register</Typography>
              </ListItemText>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setActiveComponent('HelpDesk');
                setActiveItem('Payroll');
              }}
              sx={listItemStyle('Payroll')}
            >
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1">Help Request</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </div>
    </>
  );
};

export default UserSidenavbar;
