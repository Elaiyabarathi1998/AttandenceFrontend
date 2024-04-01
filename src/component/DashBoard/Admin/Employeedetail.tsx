import React, { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


interface Employee {
  _id: any;
  
  username: String;
  rate: String;
  address: String;
  position: String;
  email: String;
  contact: String;
  DOB: String;
status: String; 

}

interface User {
    id: number;
    username: string;
    // other properties...
  }

export const Employeedetail: React.FC = () => {
    const [open, setOpen] = useState(false);
   
     const [users, setUsers] = useState<User[]>([]);
     const [isDialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState<Employee>({
         _id:'',
        username: '',
        rate: '',
        address: '',
        position: '',
        email: '',
        contact: '',
        DOB: '',
        status: 'Active',
        // image: '',
    });
    const isFormValid = () => {
      return (
        formData.username &&
        formData.rate &&
        formData.address &&
        formData.position &&
        formData.email &&
        formData.contact &&
        formData.DOB &&
        formData.status
      );
    };
    

    // Define the employees state variable
   
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload()
    };

    const handleFormSubmit = () => {
        // Create a new employee object from the form data
        if (isFormValid()) {

        if (!formData.username || !formData.rate || !formData.address || !formData.position || !formData.email || !formData.contact || !formData.DOB || !formData.status) {
          // Display an error message or perform other actions
          console.error('Please fill in all fields');
          return;
        }
        const newEmployee = {
          username: formData.username,
          rate: formData.rate,
          address: formData.address,
          position: formData.position,
          mailId: formData.email,
          contactNumber: formData.contact,
          dob: formData.DOB,
          status: formData.status,
        
      };

        // Update the employees array with the new employee
        setEmployees([...employees]);

        // Clear the form data
        setFormData({
          _id:'',
            username: '',
            rate: '',
            address: '',
            position: '',
            email: '',
            contact: '',
            DOB: '',
            status: 'Active',
            // image: '',
        });
        
        
        

        // Close the dialog
        handleClose();
        axios.post<Employee>('http://localhost:8081/api/category/employee', formData)
        .then(response => {
          console.log('Employee added successfully:', response.data);
          
          // You can handle any additional logic here
        })
        .catch(error => {
          console.error('Error adding employee:', error);
          // You can handle errors here
        });
      }else {
        // Display an error message or perform other actions
        console.error('Please fill in all fields');
      }
    };


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8081/api/category/employee');
            setEmployees(response.data);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);


      const handleDelete = async (employeeId: any) => {
        // Show a confirmation dialog using SweetAlert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this employee!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });
    
        if (result.isConfirmed) {
            try {
                // Make an HTTP DELETE request to delete the employee with the given ID
                const response = await axios.delete(`http://localhost:8081/api/category/employee/${employeeId}`);
        
                if (response.status === 200) {
                    console.log(`Employee with ID ${employeeId} deleted successfully`);
                    // Update the employees array by filtering out the deleted employee
                    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== employeeId));
                    // You can add any additional logic here
                    Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
                } else {
                    console.error(`Failed to delete employee with ID ${employeeId}`);
                    // You can handle the failure scenario here
                    Swal.fire('Error', 'Failed to delete employee. Please try again later.', 'error');
                }
            } catch (error) {
                console.error('Error deleting employee:', error);
                // You can handle errors here
                Swal.fire('Error', 'An error occurred while deleting the employee.', 'error');
            }
        } else {
            // Handle the case where the user clicks "Cancel" in the confirmation dialog
            Swal.fire('Cancelled', 'Employee deletion was cancelled.', 'info');
        }
    };
  

 
  const [employees, setEmployees] = useState<Employee[]>([]);

const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>, employee: Employee) => {
  // Prevent the default click behavior if needed
  event.preventDefault();

  // Call the existing handleEditClick function with the employee parameter
  setFormData(employee);
  setDialogOpen(true);
};



  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/category/employee/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful update, e.g., refresh data
        console.log('Data updated successfully');
        handleCloseDialog();
        window.location.reload(); // Reload the page
        // Add your toast or notification logic here
      } else {
        // Handle error
        console.error('Failed to update data');
        // Add your toast or notification logic here
      }
    } catch (error) {
      console.error('Error during update:', error);
      // Add your toast or notification logic here
    }
  };



  
    const modalContent = (
        <div>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
           

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        margin="dense"
                        id="username"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        margin="dense"
                        id="rate"
                        label="Rate"
                        type="text"
                        fullWidth
                        value={formData.rate}
                        onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="position"
                        label="Position"
                        type="text"
                        fullWidth
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        margin="dense"
                        id="mailId"
                        label="Mail ID"
                        type="text"
                        fullWidth
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="contactNumber"
                        label="Contact Number"
                        type="text"
                        fullWidth
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '48%' }}>
                        <InputLabel htmlFor="dob" shrink>
                            DOB
                        </InputLabel>
                        <TextField
                            margin="dense"
                            id="dob"
                            type="date"
                            fullWidth
                            value={formData.DOB}
                            onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
                        />
                    </div>
                    <div style={{ width: '48%' }}>
                        <RadioGroup
                            aria-label="status"
                            name="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <FormControlLabel value="Active" control={<Radio />} label="Active" />
                            <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                        </RadioGroup>
                    </div>
                </div>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </div>
    );

  

  function getMediaQueryStyles(): React.CSSProperties | undefined {
    throw new Error('Function not implemented.');
  }

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    left: '210px',
                    bottom: '20px',
                    width: 'calc(98% - 210px)',
                    height: '82%',
                    backgroundColor: '#b4c5e4',
                    borderRadius: '6px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    padding:'20px'
                }}
            >
                <div>
                    <h4 style={{ marginLeft: '15px' }}>Employee Repository</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', margin: "20px 0 0 25px" }}>
                        <input
                            type="text"
                            placeholder="Search"
                            style={{
                                width: '100%',
                                padding: '5px 30px 5px 10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <SearchIcon
                            sx={{
                                color: '#0077b6',
                                backgroundColor: 'white',
                                width: '32px',
                                height: '32px'
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            sx={{
                                marginRight: "20px",
                                marginTop: '20px',
                                color: 'white',
                                backgroundColor: '#0077b6',
                                '&:hover': {
                                    backgroundColor: '#25d366',
                                },
                            }}
                            startIcon={<AddIcon />}
                            onClick={handleClickOpen}
                        >
                            Add Employee
                        </Button>
                    </div>
                </div>
                <div style={{ height: '400px', overflowX: 'auto' }}>
                <TableContainer
    component={Paper}
    style={{
      marginTop: '50px',
      paddingLeft: '',
      width: '100%', // Default width for all screens

     
    }}
  >
    <Table
      sx={{
        minWidth: 'unset', // Default minWidth for all screens

       
      }}
    >
    <TableHead sx={{ backgroundColor: '#0077b6' }}>
  <TableRow>
    {/* <TableCell>Profile</TableCell> */}
    <TableCell sx={{ color: '#fff' }}>Name</TableCell>
    <TableCell sx={{ color: '#fff' }}>Rate</TableCell>
    <TableCell sx={{ color: '#fff' }}>Address</TableCell>
    <TableCell sx={{ color: '#fff' }}>Position</TableCell>
    <TableCell sx={{ color: '#fff' }}>Mail ID</TableCell>
    <TableCell sx={{ color: '#fff' }}>Contact Number</TableCell>
    <TableCell sx={{ color: '#fff' }}>DOB</TableCell>
    <TableCell sx={{ color: '#fff' }}>Status</TableCell>
    <TableCell sx={{ color: '#fff' }}>Action</TableCell>
  </TableRow>
</TableHead>
<TableBody    sx={{ backgroundColor: '#d9d9d9' }}>
        {employees.map((employee, index) => (
          <TableRow key={index}>
            <TableCell>{employee.username}</TableCell>
            <TableCell>{employee.rate}</TableCell>
            <TableCell>{employee.address}</TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.contact}</TableCell>
            <TableCell>{employee.DOB}</TableCell>
            <TableCell>
              <div
                style={{
                  backgroundColor: employee.status === 'Active' ? '#6bdb3f' : '#ff584b',
                  color: 'white',
                  display: 'inline-block',
                  padding: '5px',
                  borderRadius: '5px',
                }}  
              >
                {employee.status}
                
              </div>
            </TableCell>
            <TableCell>
  <IconButton
    onClick={(event) => handleEditClick(event, employee)}
    sx={{
      color: '#0077b6',
      '&:hover': {
        color:'#fff',
        backgroundColor: '#25d366',
      },
    }}
  >
    <EditIcon />
  </IconButton>
  <IconButton
    onClick={() => handleDelete(employee._id)}
    sx={{
      color: '#0077b6',
      '&:hover': {
        backgroundColor: '#25d366',
        color: 'red',
      },
    }}
  >
    <DeleteIcon />
  </IconButton>
</TableCell>

          </TableRow>
        ))}
      </TableBody>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
        <div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:"10px",marginTop:'10px' }}>
          <TextField
            label="Username"
            fullWidth
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:"10px" }}>
          <TextField
            label="Rate"
            fullWidth
            value={formData.rate.toString()}
            onChange={(e) => handleInputChange('rate', e.target.value)}
          />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:"10px" }}>
          <TextField
            label="Address"
            fullWidth
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
          
          <TextField
            label="Position"
            fullWidth
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
          />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:"10px" }}>
          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <TextField
            label="Contact"
            fullWidth
            value={formData.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
          />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:"10px", }}>
          <TextField
            label="DOB"
            fullWidth
            type="date"
            value={formData.DOB}
            onChange={(e) => handleInputChange('DOB', e.target.value)}
          />
          <TextField
            label="Status"
            fullWidth
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
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



