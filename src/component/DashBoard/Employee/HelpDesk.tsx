import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import { useAuth } from '../../context/context';

export const HelpDesk: React.FC = () => {
  const { userDetails } = useAuth();
  const [formData, setFormData] = useState({
    employeeName: userDetails.userData.username,
    queryType: '',
    message: '',
    dateTime: '',
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Make a POST request to the server
      const response = await axios.post('http://localhost:8081/api/category/helpdesk', formData);
  
      // Handle the response, e.g., show a success message
      console.log('Response from server:', response.data);
  
      // Show success notification
      toast.success('Request submitted successfully', {
        position: 'bottom-right',
        autoClose: 3000,
      });
  
      // Reset the form data
      setFormData({
        employeeName: '',
        queryType: '',
        message: '',
        dateTime: '',
      });
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error submitting form:', error);
  
      // Show error notification
      toast.error('Error submitting form', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ margin: '20px' }}>
        <h4>Help Desk</h4>
      </div>

      <div
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '5px',
          margin: 'px',
          width: '500px',
          height: '400px',
          marginLeft: '200px',
        }}
      >
        <form onSubmit={handleFormSubmit}>
        <div className="mb-1">
            <label htmlFor="employeeName" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              className="form-control"
              id="employeeName"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}

            />
          </div>

          <div className="mb-1">
            <label htmlFor="queryType" className="form-label">
              Query Type
            </label>
            <input
              type="text"
              className="form-control"
              id="queryType"
              name="queryType"
              value={formData.queryType}
              onChange={handleChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>


          <div className="mb-3">
            <label htmlFor="dateTime" className="form-label">
              Date and Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
            />
          </div>
          
          <Button  variant="contained" sx={{
                               marginLeft:'20px',
                                color: 'white',
                                backgroundColor: '#0077b6',
                                '&:hover': {
                                    backgroundColor: '#25d366',
                                },
                            }} type="submit" className="btn btn-primary">
            Submit
          </Button>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable  />
        </form>
      </div>
    </div>
  );
};
