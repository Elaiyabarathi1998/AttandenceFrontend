import React, { useState, useEffect, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/context';


interface PayrollData {
    _id: string;
    employeeName: string;
    startDate: string;
    endDate: string;
    paymentDate: string;
    totalHours: string; // Change the type to string
    hourPay: string;
    grossPay: string;
}

export const Payroll: React.FC = () => {
    
    const [showContent1, setShowContent1] = useState(true);
    const [showContent2, setShowContent2] = useState(false);
    const [employeeName, setSelectedFilter] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState<PayrollData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState<PayrollData>({
        _id: '',
        employeeName: '',
        startDate: '',
        endDate: '',
        paymentDate: '',
        totalHours: '0', // Assuming it's a string initially
        hourPay: '0',
        grossPay: '0',
      });

    const formRef = useRef<HTMLFormElement>(null);


    const [dataRow, setData] = useState<PayrollData[]>([]);

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<{ username: string }[]>([]);

    useEffect(() => {
        // Fetch data from your API endpoint using Axios
        axios.get('http://localhost:8081/api/category/payroll')
            .then((response) => {
                // Check if response data has the expected structure
                if (response.data && Array.isArray(response.data.payrolls)) {
                    setData(response.data.payrolls as PayrollData[]);
                } else {
                    console.error('Invalid API response format. Expected an array:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when data is fetched
            });
    }, []);




    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            employeeName: event.target.value,
        });
    };

    const handleInputPostChange = (
        e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
    ) => {
        const { name, value } = e.target || {};
        setFormData((prevData) => ({
            ...prevData,
            [name as string]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Make a POST request to submit the form data
            const response = await axios.post('http://localhost:8081/api/category/payroll', formData);

            // Check if the submission was successful
            if (response.status === 201) {
                console.log('Form data submitted successfully!');
                // Optionally, you can update the data state to include the new payroll
                setData((prevData) => [...prevData, response.data.payroll]);


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
                if (formRef.current) {
                    formRef.current.reset();
                }

                window.location.reload();

            } else {
                console.error('Failed to submit form data. Server returned:', response);

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
        } catch (error) {
            console.error('Error submitting form data:', error);

            // Show error toast
            toast.error('Error submitting form data. Please try again later.', {
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



   
const handleDelete = async (row: PayrollData) => {
    // Display SweetAlert confirmation dialog
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this row!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
    });

    // Check if the user clicked the confirm button
    if (result.isConfirmed) {
        try {
            // Make a DELETE request to delete the selected row
            const response = await axios.delete(`http://localhost:8081/api/category/payroll/${row._id}`);

            if (response.status === 200) {
                console.log('Row deleted successfully!');
                // Update the data state to exclude the deleted row
                setData((prevData) => prevData.filter((item) => item._id !== row._id));

                // Show success SweetAlert
                Swal.fire('Deleted!', 'Your row has been deleted.', 'success');
            } else {
                console.error('Failed to delete row. Server returned:', response);

                // Show error SweetAlert
                Swal.fire('Error!', 'Failed to delete row. Please try again later.', 'error');
            }
        } catch (error) {
            console.error('Error deleting row:', error);

            // Show error SweetAlert
            Swal.fire('Error!', 'Error deleting row. Please try again later.', 'error');
        }
    }
};



    const handleShowContent1 = () => {
        setShowContent1(true);
        setShowContent2(false);
    };

    const handleShowContent2 = () => {
        setShowContent1(false);
        setShowContent2(true);
    };


    useEffect(() => {
        // Fetch user data from the API
        axios.get('http://localhost:8081/users')
            .then((response) => {
                // Assuming the API returns an array of user objects with a 'username' property
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleFilterNewChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            employeeName: e.target.value,
        });
    };

    

    

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>, data: PayrollData) => {
        event.preventDefault();
      
        // Convert totalHours to a string before setting the state
        setFormData({
          ...data
        });
      
        setIsDialogOpen(true);
      };
      const handleCloseDialog = () => {
        setIsDialogOpen(false);
      };

      const handleInputChange = (field: string, value: string) => {
        // Convert totalHours to a number if the field is 'totalHours'
        const updatedValue = field === 'totalHours' ? parseFloat(value) : value;
      
        // Update the state using the field and value
        setFormData((prevData) => ({
          ...prevData,
          [field]: updatedValue,
        }));
      };

      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:8081/api/category/payroll/${formData._id}`, {
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
                    padding: '20px',
                }}
            >
                <h4>Payroll</h4>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '20px',
                    }}
                >
                    <Button
                        variant="contained"
                        color={showContent1 ? 'primary' : 'secondary'}
                        onClick={handleShowContent1}
                        startIcon={
                            showContent1 ? (
                                <FiberManualRecordIcon sx={{ color: 'greenyellow' }} />
                            ) : undefined // Change 'null' to 'undefined'
                        }
                    >
                        Payroll Log
                    </Button>
                    <Button
                        variant="contained"
                        color={showContent2 ? 'primary' : 'secondary'}
                        sx={{ marginLeft: '15px' }}
                        onClick={handleShowContent2}
                        startIcon={
                            showContent2 ? (
                                <FiberManualRecordIcon sx={{ color: 'greenyellow' }} />
                            ) : undefined
                        }
                    >
                        New Payroll
                    </Button>
                </div>

                {showContent1 && (

                    <div
                        style={{
                            marginTop: '10px',
                            padding: '20px',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h4>Payroll Log</h4>
                        <div style={{ display: 'flex', }}>
                            <div
                                style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '10px',
                                }}
                            >
                                <select
                                    id="filter"
                                    value={formData.employeeName}
                                    onChange={handleFilterNewChange}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '8px',
                                        fontSize: '18px',
                                        backgroundColor: '#d9d9d9',
                                        width: '300px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <option value="" style={{ backgroundColor: '#fff', color: '#000' }} disabled>
                                        Select an Employee
                                    </option>
                                    {users.map((user) => (
                                        <option
                                            key={user.username} // Assuming 'username' is a unique identifier
                                            value={user.username}
                                            style={{ backgroundColor: '#fff', color: '#000' }}
                                        >
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div
                                style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '10px',
                                }}
                            >
                                {/* date picker  */}
                                <div style={{ marginBottom: '20px' }}>
                                    <form className="row no-gutters flex-column flex-md-row align-items-md-end"
                                    //    onSubmit={handleSubmit}
                                    >

                                        <div className="col-12 col-md">
                                            <label htmlFor="start-date">Start Date</label>
                                            <input style={{ padding: "10px", backgroundColor: '#d9d9d9', }} className="form-control" id="start-date" name="start-date" type="date" placeholder="Select start date" />
                                        </div>
                                        <div className="col-12 col-md">
                                            <label htmlFor="end-date">End Date</label>
                                            <input style={{ padding: "10px", backgroundColor: '#d9d9d9', }} className="form-control" id="end-date" name="end-date" type="date" placeholder="Select end date" />
                                        </div>

                                    </form>
                                </div>


                            </div>
                        </div>
                        <div style={{ height: '200px', overflowX: 'auto' }}>
                            <TableContainer component={Paper}>
                                <Table>
                                <TableHead sx={{ backgroundColor: '#0077b6' }}>
                                        <TableRow>
                                            <TableCell sx={{ color: '#fff' }}>Employee</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>Payment Date</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>Starting Date</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>Ending Date</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>Total Hours</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>Gross Pay</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>hourPay:</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>Action</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody    sx={{ backgroundColor: '#d9d9d9' }}>
                                        {dataRow.map((row, index) => (
                                            <TableRow  key={index}>
                                                <TableCell>{row.employeeName}</TableCell>
                                                <TableCell>{row.paymentDate}</TableCell>
                                                <TableCell>{row.startDate}</TableCell>
                                                <TableCell>{row.endDate}</TableCell>
                                                <TableCell>{row.totalHours}</TableCell>
                                                <TableCell>{row.grossPay}</TableCell>
                                                <TableCell>{row.hourPay}</TableCell>

                                                <TableCell>
                                                   <IconButton aria-label="Edit"  onClick={(event) => handleEditClick(event, row)}
                                                    sx={{
                                                        color: '#0077b6',
                                                        '&:hover': {
                                                          color:'#fff',
                                                          backgroundColor: '#25d366',
                                                        },
                                                      }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="Delete" onClick={() => handleDelete(row)}
                                                    
                                                    sx={{
                                                        color: '#0077b6',
                                                        '&:hover': {
                                                          backgroundColor: '#25d366',
                                                          color: 'red',
                                                        },
                                                      }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>Edit Employee Payroll</DialogTitle>
      <DialogContent >
        {/* Add TextField components for each property */}
        <TextField
          fullWidth
          label="Payment Date"
          type="date"
          value={formData.paymentDate}
          onChange={(e) => handleInputChange('paymentDate', e.target.value)}

          style={{ marginBottom: '16px' ,marginTop: '16px' }}
        />

        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
          style={{ marginBottom: '16px' }}
        />

        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(e) => handleInputChange('endDate', e.target.value)}
          style={{ marginBottom: '16px' }}
        />

        <TextField
          fullWidth
          label="Total Hours"
          type="number"
          value={formData.totalHours}
          onChange={(e) => handleInputChange('totalHours', e.target.value)}
          style={{ marginBottom: '16px' }}
        />

        <TextField
          fullWidth
          label="Gross Pay"
          type="number"
          value={formData.grossPay}
          onChange={(e) => handleInputChange('grossPay', e.target.value)}
          style={{ marginBottom: '16px' }}
        />

        <TextField
          fullWidth
          label="Hour Pay"
          type="number"
          value={formData.hourPay}
          onChange={(e) => handleInputChange('hourPay', e.target.value)}
          style={{ marginBottom: '16px' }}
        />
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
                )}

                {showContent2 && (
                    <div
                        style={{
                            marginTop: '20px',
                            padding: '20px',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h4>New Payroll</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paper elevation={2}>
                                <Box width="600px" height="300px">
                                    <form ref={formRef} onSubmit={handleSubmit}>
                                        <div style={{ marginBottom: '20px' }}>
                                            <select
                                                id="filter"
                                                value={formData.employeeName}
                                                onChange={handleFilterNewChange}
                                                style={{
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    fontSize: '18px',
                                                    backgroundColor: '#d9d9d9',
                                                    width: '300px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <option value="" style={{ backgroundColor: '#fff', color: '#000' }} disabled>
                                                    Select an Employee
                                                </option>
                                                {users.map((user) => (
                                                    <option
                                                        key={user.username} // Assuming 'username' is a unique identifier
                                                        value={user.username}
                                                        style={{ backgroundColor: '#fff', color: '#000' }}
                                                    >
                                                        {user.username}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="row no-gutters flex-column flex-md-row align-items-md-end">
                                                <div className="col-12 col-md">
                                                    <label htmlFor="start-date">Start Date</label>
                                                    <input
                                                        style={{ padding: '10px', backgroundColor: '#d9d9d9' }}
                                                        className="form-control"
                                                        id="start-date"
                                                        name="startDate"
                                                        type="date"
                                                        placeholder="Select start date"
                                                        value={formData.startDate}
                                                        onChange={handleInputPostChange}
                                                    />
                                                </div>
                                                <div className="col-12 col-md">
                                                    <label htmlFor="end-date">End Date</label>
                                                    <input
                                                        style={{ padding: '10px', backgroundColor: '#d9d9d9' }}
                                                        className="form-control"
                                                        id="end-date"
                                                        name="endDate"
                                                        type="date"
                                                        placeholder="Select end date"
                                                        value={formData.endDate}
                                                        onChange={handleInputPostChange}
                                                    />
                                                </div>
                                                <div className="col-12 col-md">
                                                    <label htmlFor="payment-date">Payment Date</label>
                                                    <input
                                                        style={{ padding: '10px', backgroundColor: '#d9d9d9' }}
                                                        className="form-control"
                                                        id="payment-date"
                                                        name="paymentDate"
                                                        type="date"
                                                        placeholder="Select payment date"
                                                        value={formData.paymentDate}
                                                        onChange={handleInputPostChange}
                                                    />
                                                </div>
                                               <div className="col-12 col-md">
                                                    <label htmlFor="total-hours">Total Hours</label>
                                                    <input
                                                        style={{ padding: '10px', backgroundColor: '#d9d9d9' }}
                                                        className="form-control"
                                                         id="total-hours"
                                                        name="totalHours"
                                                        type="number"
                                                        placeholder="Enter total hours"
                                                        value={formData.totalHours}
                                                        onChange={handleInputPostChange}
                                                    />
                                                </div>
                                                <div className="col-12 col-md">
                                                    <label htmlFor="hour-pay">Hour Pay</label>
                                                    <input
                                                        style={{ padding: '10px', backgroundColor: '#d9d9d9' }}
                                                        className="form-control"
                                                        id="hour-pay"
                                                        name="hourPay"
                                                        type="number"
                                                        placeholder="Enter hour pay"
                                                        value={formData.hourPay}
                                                        onChange={handleInputPostChange}
                                                    />
                                                </div>
                                                <div className="col-12 col-md">
                                                    <label htmlFor="gross-pay">Gross Pay</label>
                                                    <input
                                                        style={{ padding: '10px', backgroundColor: '#d9d9d9' }}
                                                        className="form-control"
                                                        id="gross-pay"
                                                        name="grossPay"
                                                        type="number"
                                                        placeholder="Enter gross pay"
                                                        value={formData.grossPay}
                                                        onChange={handleInputPostChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"

                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#0077b6',
                                                '&:hover': {
                                                    backgroundColor: '#25d366',
                                                },
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '8px 15px',
                                                marginTop: '20px',
                                                borderRadius: '6px',
                                                fontSize: '16px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            Submit
                                            <FontAwesomeIcon
                                                icon={faPaperPlane}
                                                style={{ marginLeft: '5px', color: '#25d366' }}
                                            />
                                        </Button>
                                        <ToastContainer />
                                    </form>
                                </Box>
                            </Paper>
                        </div>

                    </div>
                )}


            </div>
        </>
    );
};
