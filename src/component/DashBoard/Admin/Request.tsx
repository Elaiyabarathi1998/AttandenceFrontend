import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

interface EmployeeRequest {
  _id: string;
  employeeName: string;
  queryType: string;
  message: string;
  dateTime: string;
}

export const Timelog: React.FC = () => {
  const [employeeRequests, setEmployeeRequests] = useState<EmployeeRequest[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<EmployeeRequest | null>(null);

  const handleOpenModal = (request: EmployeeRequest) => {
    setSelectedRequest(request);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setOpenModal(false);
  };

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8081/api/category/helpdesk')
      .then(response => {
        setEmployeeRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts


  
  const handleDeleteRequest = async (requestId: string) => {
  try {
    // Make a DELETE request to the server
    const response = await axios.delete(`http://localhost:8081/api/category/helpdesk/${requestId}`);

    // Handle the response, e.g., show a success message
    console.log('Response from server:', response.data);

    // Filter out the deleted request from the state
    setEmployeeRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));

    // Show success notification
    toast.success('Request deleted successfully', {
      position: 'top-right',
      autoClose: 3000,
    });
  } catch (error) {
    // Type assertion to cast error to AxiosError
    const axiosError = error as AxiosError;

    // Log the Axios error details
    console.error('Error deleting request:', axiosError);

    // Check if the error has a response
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', axiosError.response.data);
      console.error('Response status:', axiosError.response.status);
      console.error('Response headers:', axiosError.response.headers);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('No response received:', axiosError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error during request setup:', axiosError.message);
    }

    // Show error notification
    toast.error('Error deleting request', {
      position: 'top-right',
      autoClose: 3000,
    });
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
        }}
      >
        <h4 style={{ marginLeft: '15px', marginTop: '10px', fontSize: '24px' }}>
          Employee Request
        </h4>
        <div style={{ height: '400px', overflowX: 'auto' }}>
<div style={{display:'flex',flexWrap:"wrap"}}>
        {employeeRequests.map((request, index) => (
          <Card
            key={index}
            style={{
              margin: '10px',
              width: '300px',
              backgroundColor: '#d9d9d9',
              position: 'relative',
            }}
          >
            {/* Delete icon positioned top right */}
            <IconButton
            style={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={() => handleDeleteRequest(request._id)}
          >
              <DeleteIcon color="error" />
            </IconButton>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable  />

            <CardHeader
              avatar={<Avatar>A</Avatar>}
              title={
                <Tooltip title="High Importance" arrow>
                  <span style={{ fontSize: '18px' }}>
                    {request.employeeName}{' '}
                    <IconButton size="small">
                      <ErrorIcon color="error" />
                    </IconButton>
                  </span>
                </Tooltip>
              }
            />
            <CardContent>
              <span style={{ fontSize: '20px', fontWeight: 'bolder' }}>{request.queryType}</span>
              <br />
              {request.dateTime}
              <Button
                variant="contained"
                sx={{
                  marginLeft: '25px',
                  color: 'white',
                  backgroundColor: '#0077b6',
                  '&:hover': {
                    backgroundColor: '#25d366',
                  },
                }}
                onClick={() => handleOpenModal(request)}
              >
                View
              </Button>
            </CardContent>
          </Card>
        ))}
</div>
</div>

<Dialog open={openModal} onClose={handleCloseModal} sx={{ '& .MuiDialog-paper': { width: '500px', height: '300px' } }}>
  <DialogTitle><h3>Query</h3></DialogTitle>
  <DialogContent>
    
    <Typography variant="body1">
      <strong>{selectedRequest?.message}</strong>
    </Typography>
    {/* Add other details you want to display */}
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleCloseModal}
      sx={{
        marginRight: '20px',
        marginTop: '20px',
        color: 'white',
        backgroundColor: '#0077b6',
        '&:hover': {
          backgroundColor: '#25d366',
        },
      }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

      </div>
    </>
  );
};
