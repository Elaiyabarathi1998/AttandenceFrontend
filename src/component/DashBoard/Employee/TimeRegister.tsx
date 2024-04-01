import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { useAuth } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AttendanceRecord {
  _id: string;
  date: string;
  checkInMorning: string;
  checkOutAfternoon: string;
  checkInAfternoon: string;
  checkOutMorning: string;
  totalHours: number;
  status: string;
  username:string;
}

export const TimeRegister = () => {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const [formData, setFormData] = useState({
    date: '',
    checkInMorning: '',
    checkOutAfternoon: '',
    checkInAfternoon: '',
    checkOutMorning: '',
    totalHours: '',
    status: 'active', // Set a default status if needed
    username: userDetails.userData.username, // Add the username property
  });
  const [selectedFilter, setSelectedFilter] = useState<string>('All'); // Default to 'All'
  const [open, setOpen] = useState(false);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name: string }>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    // Calculate total hours whenever the relevant time values change
    const calculateTotalHours = () => {
      const { checkInMorning, checkOutAfternoon, checkInAfternoon, checkOutMorning } = formData;

      // Implement your logic to calculate total hours
      // Here, we assume that all time values are valid and in the format 'HH:mm'
      const totalHours = calculateTimeDifference(checkInMorning, checkOutAfternoon) +
        calculateTimeDifference(checkInAfternoon, checkOutMorning);

      // Update the total hours in the form data
      setFormData((prevData) => ({
        ...prevData,
        totalHours: String(totalHours),
      }));
    };

    calculateTotalHours();
  }, [formData.checkInMorning, formData.checkOutAfternoon, formData.checkInAfternoon, formData.checkOutMorning]);

  // Function to calculate the time difference in hours between two time strings
  const calculateTimeDifference = (startTime: string, endTime: string): number => {
    const start = new Date(`2022-01-01 ${startTime}`);
    const end = new Date(`2022-01-01 ${endTime}`);
    const timeDiff = end.getTime() - start.getTime();
    const hours = timeDiff / (1000 * 60 * 60);
    return hours;
  };



useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/admin/attendance-records', {
        params: {
          filter: selectedFilter,
          username: userDetails.userData.username,
        },
      });

      setAttendanceRecords(response.data.data);
      console.log(response.data);

      // Show success toast
      toast.success('Data fetched successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error fetching data:', error);

      // Show error toast
      toast.error('Failed to fetch data. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  fetchData();
}, [selectedFilter, userDetails.userData.username]);

const filteredRecords = attendanceRecords.filter((row) => row.username === userDetails.userData.username);




  

  

const handleFormSubmit = async () => {
  try {
    // Make a copy of the formData, including the username
    const formDataWithUsername = {
      ...formData,
      username: userDetails.userData.username,
    };

    // Make the POST request using Axios
    const response = await axios.post('http://localhost:8081/api/admin/attendance-records', formDataWithUsername);

    // Handle the response accordingly
    console.log('Server response:', response.data);
    window.location.reload()

    // Show success toast
    toast.success('Form data submitted successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    console.error('Error submitting form data:', error);

    // Show error toast
    toast.error('Failed to submit form data. Please try again later.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
   
    setOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target || {};
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  const modalContent = (
    <div style={{ width: 'auto'}}>
       
      <DialogTitle>Time LOG </DialogTitle>
      <DialogContent sx={{ width: '80vw' }}>
      <TableContainer component={Paper} style={{ marginTop: '50px', paddingLeft: '10px' }}>
          <Table>
          <TableHead sx={{ backgroundColor: '#0077b6' }}>
              <TableRow>
              <TableCell sx={{ color: '#fff' }}>EmployeeName</TableCell>
                <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                <TableCell sx={{ color: '#fff' }}>Time-in (Morning)</TableCell>
                <TableCell sx={{ color: '#fff' }}>Time-out (Afternoon)</TableCell>
                <TableCell sx={{ color: '#fff' }}>Time-in (Afternoon)</TableCell>
                <TableCell sx={{ color: '#fff' }}>Time-out</TableCell>
                <TableCell sx={{ color: '#fff' }}>Total Hours</TableCell>
                <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody    sx={{ backgroundColor: '#d9d9d9' }}>
            {Array.isArray(filteredRecords) &&
              filteredRecords.map((row) => {
                return (
            <TableRow key={row._id}>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.checkInMorning}</TableCell>
              <TableCell>{row.checkOutMorning}</TableCell>
              <TableCell>{row.checkInAfternoon}</TableCell>
              <TableCell>{row.checkOutAfternoon}</TableCell>
              <TableCell>{row.totalHours}</TableCell>
              <TableCell><div
                style={{
                  backgroundColor: row.status === 'active' ? '#6bdb3f' : '#ff584b',
                  color: 'white',
                  display: 'inline-block',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                          {row.status}
                          </div>
                  </TableCell>
              <TableCell>
              
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>

          </Table>
        </TableContainer>

      </DialogContent>
      <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            </DialogActions>
          
    </div>
  )

  return (
    <>
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
        }}
      >
        <h4>Time Register</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginLeft: '20px',
          }}
        >
          <h4 style={{ fontSize: '24px', marginBottom: '10px' }}>Digital Clock</h4>
          <div style={{ fontSize: '20px' }}>{formattedTime}</div>
        </div>

        {/* Add the centered box below the h4 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // Adjust the height as needed
            // You can add more styles as needed
          }}
        >
          {/* Your content for the centered box */}
          <div
            style={{
              width: '600px', // Set the width as needed
              height: '300px', // Set the height as needed
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            
        <form>
        <TextField
  label={`Employee-Username`}
  type="text"
  name="text"
  value={formData.username} 
  InputLabelProps={{
    shrink: true,
  }}
  sx={{ marginBottom: 2, marginRight: 2 }}
/>
      <TextField
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginBottom: 2, marginRight: 2 }}
      />

      <TextField
        label="Check In Morning"
        type="time"
        name="checkInMorning"
        value={formData.checkInMorning}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginBottom: 2, marginRight: 2 ,width:"150px"}}
      />

      <TextField
        label="Check Out Afternoon"
        type="time"
        name="checkOutAfternoon"
        value={formData.checkOutAfternoon}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginBottom: 2, marginRight: 2 ,width:"150px"}}
      />

      <TextField
        label="Check In Afternoon"
        type="time"
        name="checkInAfternoon"
        value={formData.checkInAfternoon}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginBottom: 2, marginRight: 2 ,width:"150px"}}
      />

      <TextField
        label="Check Out Morning"
        type="time"
        name="checkOutMorning"
        value={formData.checkOutMorning}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginBottom: 2, marginRight: 2 ,width:"150px"}}
      />

      <TextField
        label="Total Hours"
        type="number"
        name="totalHours"
        value={formData.totalHours}
        onChange={handleInputChange}
        sx={{ marginBottom: 2, marginRight: 2 }}
      />

      <FormControl sx={{ marginBottom: 2, marginRight: 2 ,}}>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          sx={{width:"150px"}}
          
        >
          <MenuItem value="active" >Active</MenuItem>
          <MenuItem value="inactive">inActive</MenuItem>
          
        </Select>
      </FormControl>
    </form>

    <Button variant="contained" sx={{
                               
                                color: 'white',
                                backgroundColor: '#0077b6',
                                '&:hover': {
                                    backgroundColor: '#25d366',
                                },
                            }}onClick={handleFormSubmit}>
                Submit
              </Button>
             


              <Button variant="contained" sx={{
                               marginLeft:'20px',
                                color: 'white',
                                backgroundColor: '#0077b6',
                                '&:hover': {
                                    backgroundColor: '#25d366',
                                },
                            }} onClick={handleClickOpen} >
                View Time Log History
              </Button>
              <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable  />

          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} sx={{ Width: '900px' }}>
        {modalContent}
      </Dialog>
    </>
  );
};
