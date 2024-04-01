import React, { useState, useEffect, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';



import axios from 'axios';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';

interface AttendanceRecord {
  username: string;
  _id: string;
  // month: string;
  date: string;
  checkInMorning: string;
  checkOutAfternoon: string;
  checkInAfternoon: string;
  checkOutMorning: string;
  totalHours: number;
  status: string;
}
export const Attendance: React.FC = () => {
  // State to store the selected filter option
  const [selectedFilter, setSelectedFilter] = useState<string>('All'); // Default to 'All'
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<AttendanceRecord[]>([]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const [formData, setFormData] = useState({
    _id: '',

    date: '',
    checkInMorning: '',
    checkOutAfternoon: '',
    checkInAfternoon: '',
    checkOutMorning: '',
    totalHours: 0,
    status: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target || {};
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/admin/attendance-records?filter=${selectedFilter}`);
        setAttendanceRecords(response.data.data);

        console.log(response.data);
        if (selectedFilter === "") {
          setFilteredData(response.data.data);
        } else {
          const filteredRecords = response.data.data.filter((row: AttendanceRecord) => row.username === selectedFilter);
          setFilteredData(filteredRecords);
        }

        // Show success notification
        toast.success('Data fetched successfully', {
          position: 'top-right',
          autoClose: 3000, // milliseconds
        });

      } catch (error) {
        console.error('Error fetching data:', error);

        // Show error notification
        toast.error('Error fetching data', {
          position: 'top-right',
          autoClose: 3000, // milliseconds
        });
      }
    };

    fetchData();
  }, [selectedFilter]);


  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/attendance-records/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful update, e.g., refresh data
        console.log('Data updated successfully');
        handleClose();
        window.location.reload(); // Reload the page
        toast.success('Data updated successfully', { position: 'bottom-right', autoClose: 5000 });
      } else {
        // Handle error
        console.error('Failed to update data');
        toast.error('Failed to update data', { position: 'bottom-right', autoClose: 5000 });
      }
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error during update', { position: 'bottom-right', autoClose: 5000 });
    }
  };

  const handleDelete = async (row: AttendanceRecord) => {
    try {
      // Show SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      // If the user clicks "Yes", proceed with the delete operation
      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:8081/api/admin/attendance-records/${row._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Record deleted successfully');
          window.location.reload();

          toast.success('Record deleted successfully', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          console.error('Failed to delete record');
          toast.error('Failed to delete record. Please try again later.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      toast.error('Error deleting record. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };


  // Function to handle filter selection change
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
    const selectedUsername = event.target.value;
    // You can perform filtering logic here based on the selected option
    if (selectedUsername === "") {
      setFilteredData(attendanceRecords);
    } else {
      const filteredRecords = attendanceRecords.filter((row) => row.username === selectedUsername);
      setFilteredData(filteredRecords);
    }
  };

  const handleClickOpen = (row: AttendanceRecord) => {
    setFormData(row);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const modalContent = (
    <div>

      <DialogTitle>Time Alot Modification </DialogTitle>
      <DialogContent>
        <label htmlFor="filter" style={{ marginRight: '10px', fontSize: '20px' }}>
          Employee
        </label>
        <form>
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
            sx={{ marginBottom: 2, marginRight: 2, width: "150px" }}
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
            sx={{ marginBottom: 2, marginRight: 2, width: "150px" }}
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
            sx={{ marginBottom: 2, marginRight: 2, width: "150px" }}
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
            sx={{ marginBottom: 2, marginRight: 2, width: "150px" }}
          />

          <TextField
            label="Total Hours"
            type="number"
            name="totalHours"
            value={formData.totalHours}
            onChange={handleInputChange}
            sx={{ marginBottom: 2, marginRight: 2 }}
          />

          <FormControl sx={{ marginBottom: 2, marginRight: 2, }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              sx={{ width: "150px" }}

            >
              <MenuItem value="active" >Active</MenuItem>
              <MenuItem value="inactive">inActive</MenuItem>

            </Select>
          </FormControl>
        </form>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleUpdate()} color="primary">
          Save
        </Button>
        <ToastContainer position="top-right" autoClose={5000} />
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
          backgroundColor: '#f0f0f0', // Background color changed
          borderRadius: '10px', // Increased border radius
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          padding: '20px', // Add padding
        }}
      >
        <div>
          <h4 style={{ marginLeft: '15px', marginTop: '0', fontSize: '24px' }}>
            Attendance Log
          </h4>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            <label htmlFor="filter" style={{ marginRight: '10px', fontSize: '20px' }}>
              Select By Filter Employee
            </label>
            <select
              id="filter"
              value={selectedFilter}
              onChange={handleFilterChange}
              style={{
                padding: '10px',
                borderRadius: '6px',
                fontSize: '16px',
                width: '200px',
                border: 'none',
              }}
            >
              <option value="" style={{ backgroundColor: '#87CEEB', color: '#000' }} disabled>
                Select the Employee
              </option>
              {Array.isArray(attendanceRecords) &&
                attendanceRecords.map((row) => (
                  <option key={row._id} value={row.username}>
                    {row.username}
                  </option>
                ))}
            </select>

          </div>

          <div>
            <Button type="submit" sx={{
              color: 'white',
              backgroundColor: '#0077b6',
              '&:hover': {
                backgroundColor: '#25d366',

              }, display: 'flex', alignItems: 'center', padding: '8px 15px', marginTop: '20px', borderRadius: '6px', fontSize: '16px', border: 'none', cursor: 'pointer', marginLeft: '10px'
            }}>
              Submit
              <FontAwesomeIcon icon={faPaperPlane} style={{ marginLeft: '5px', color: '#25d366' }} />
            </Button>

          </div>
        </div>
        <div style={{ height: '400px', overflowX: 'auto' }}>
          <TableContainer component={Paper} style={{ marginTop: '50px', }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#0077b6' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Employee Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Time-in (Morning)</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Time-out (Afternoon)</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Time-in (Afternoon)</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Time-out</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Total Hours</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: '#d9d9d9' }}>
                {Array.isArray(filteredData) &&
                  filteredData.map((row) => {
                    return (
                      <TableRow key={row._id}>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.checkInMorning}</TableCell>
                        <TableCell>{row.checkOutMorning}</TableCell>
                        <TableCell>{row.checkInAfternoon}</TableCell>
                        <TableCell>{row.checkOutAfternoon}</TableCell>
                        <TableCell>{row.totalHours}</TableCell>
                        <TableCell>
                          <div
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
                          <ButtonGroup>
                            <IconButton
                              color="primary"
                              onClick={() => handleClickOpen(row)}
                              sx={{
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
                              color="secondary"
                              onClick={() => handleDelete(row)}
                              sx={{
                                color: '#0077b6',
                                '&:hover': {
                                  backgroundColor: '#25d366',
                                  color: 'red',
                                },
                              }}
                            >
                              <DeleteIcon />
                              <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
                            </IconButton>
                          </ButtonGroup>
                        </TableCell>


                      </TableRow>
                    );
                  })}
              </TableBody>

            </Table>
          </TableContainer>
        </div>

      </div>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: '600px' }}>
        {modalContent}
      </Dialog>

    </>
  );
};
