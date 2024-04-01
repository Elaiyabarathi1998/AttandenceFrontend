// import React, { useState,useEffect } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import Tooltip from '@mui/material/Tooltip';
// import EditIcon from '@mui/icons-material/Edit';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputLabel from '@mui/material/InputLabel';
// import axios from 'axios'

// interface Employee {
//   name: string;
//   rate: string;
//   address: string;
//   position: string;
//   mailId: string;
//   contactNumber: string;
//   dob: string;
//   status: string;
// //   image: string;
// }

// export const Employeedet: React.FC = () => {
//     const [open, setOpen] = useState(false);
//      const [employees, setEmployees] = useState<Employee[]>([]);
//     const [formData, setFormData] = useState({
//         name: '',
//         rate: '',
//         address: '',
//         position: '',
//         email: '',
//         contact: '',
//         DOB: '',
//         status: 'Active',
//         // image: '',
//     });

    

//     // Define the employees state variable
   
//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleFormSubmit = () => {
//         // Create a new employee object from the form data
//         const newEmployee = {
//           name: formData.name,
//           rate: formData.rate,
//           address: formData.address,
//           position: formData.position,
//           mailId: formData.email,
//           contactNumber: formData.contact,
//           dob: formData.DOB,
//           status: formData.status,
//         //   image: formData.image,
//       };

//         // Update the employees array with the new employee
//         setEmployees([...employees, newEmployee]);

//         // Clear the form data
//         setFormData({
//             name: '',
//             rate: '',
//             address: '',
//             position: '',
//             email: '',
//             contact: '',
//             DOB: '',
//             status: 'Active',
//             // image: '',
//         });

//         // Close the dialog
//         handleClose();
//         axios.post<Employee>('http://localhost:8081/api/category/employee', newEmployee)
//         .then(response => {
//           console.log('Employee added successfully:', response.data);
//           // You can handle any additional logic here
//         })
//         .catch(error => {
//           console.error('Error adding employee:', error);
//           // You can handle errors here
//         });
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get('http://localhost:8081/api/category/employee');
//             setEmployees(response.data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//       }, []);
//     // const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //     const file = event.target.files && event.target.files[0];

//     //     if (file) {
//     //         const reader = new FileReader();
//     //         reader.onload = (e) => {
//     //             if (e.target && typeof e.target.result === 'string') {
//     //                 setFormData({
//     //                     ...formData,
//     //                     image: e.target.result as string,
//     //                 });
//     //             }
//     //         };
//     //         reader.readAsDataURL(file);
//     //     }
//     // };

//     const modalContent = (
//         <div>
//             <DialogTitle>Add Employee</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     id="name"
//                     label="Name"
//                     type="text"
//                     fullWidth
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <TextField
//                         margin="dense"
//                         id="rate"
//                         label="Rate"
//                         type="text"
//                         fullWidth
//                         value={formData.rate}
//                         onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
//                     />
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <TextField
//                         margin="dense"
//                         id="address"
//                         label="Address"
//                         type="text"
//                         fullWidth
//                         value={formData.address}
//                         onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                     />
//                     <TextField
//                         margin="dense"
//                         id="position"
//                         label="Position"
//                         type="text"
//                         fullWidth
//                         value={formData.position}
//                         onChange={(e) => setFormData({ ...formData, position: e.target.value })}
//                     />
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <TextField
//                         margin="dense"
//                         id="mailId"
//                         label="Mail ID"
//                         type="text"
//                         fullWidth
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     />
//                     <TextField
//                         margin="dense"
//                         id="contactNumber"
//                         label="Contact Number"
//                         type="text"
//                         fullWidth
//                         value={formData.contact}
//                         onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
//                     />
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <div style={{ width: '48%' }}>
//                         <InputLabel htmlFor="dob" shrink>
//                             DOB
//                         </InputLabel>
//                         <TextField
//                             margin="dense"
//                             id="dob"
//                             type="date"
//                             fullWidth
//                             value={formData.DOB}
//                             onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
//                         />
//                     </div>
//                     <div style={{ width: '48%' }}>
//                         <RadioGroup
//                             aria-label="status"
//                             name="status"
//                             value={formData.status}
//                             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                         >
//                             <FormControlLabel value="Active" control={<Radio />} label="Active" />
//                             <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
//                         </RadioGroup>
//                     </div>
//                 </div>
//                 {/* <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <input
//                         accept="image/*"
//                         id="profilePictureInput"
//                         type="file"
//                         style={{ display: 'none' }}
//                         onChange={handleProfilePictureChange}
//                     />
//                     <label htmlFor="profilePictureInput">
//                         <Button
//                             variant="contained"
//                             component="span"
//                             fullWidth
//                             sx={{
//                                 color: 'white',
//                                 backgroundColor: '#0077b6',
//                                 marginTop: 2,
//                                 '&:hover': {
//                                     backgroundColor: '#25d366',
//                                 },
//                             }}
//                             startIcon={<AddIcon />}
//                         >
//                             Choose Profile Picture
//                         </Button>
//                     </label>
//                 </div> */}
//                 {/* {formData.image && (
//                     <Avatar
//                         src={formData.image}
//                         alt="Profile Picture"
//                         sx={{ width: 100, height: 100, marginTop: 2 }}
//                     />
//                 )} */}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleFormSubmit} color="primary">
//                     Save
//                 </Button>
//             </DialogActions>
//         </div>
//     );

//     return (
//         <>
//             <div
//                 style={{
//                     position: 'absolute',
//                     left: '210px',
//                     bottom: '20px',
//                     width: 'calc(98% - 210px)',
//                     height: '82%',
//                     backgroundColor: '#b4c5e4',
//                     borderRadius: '6px',
//                     boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
//                 }}
//             >
//                 <div>
//                     <h4 style={{ marginLeft: '15px' }}>Employee Repository</h4>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', margin: "20px 0 0 25px" }}>
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             style={{
//                                 width: '100%',
//                                 padding: '5px 30px 5px 10px',
//                                 borderRadius: '5px',
//                                 border: '1px solid #ccc',
//                             }}
//                         />
//                         <SearchIcon
//                             sx={{
//                                 color: '#0077b6',
//                                 backgroundColor: 'white',
//                                 width: '32px',
//                                 height: '32px'
//                             }}
//                         />
//                     </div>
//                     <div>
//                         <Button
//                             variant="contained"
//                             sx={{
//                                 marginRight: "20px",
//                                 marginTop: '20px',
//                                 color: 'white',
//                                 backgroundColor: '#0077b6',
//                                 '&:hover': {
//                                     backgroundColor: '#25d366',
//                                 },
//                             }}
//                             startIcon={<AddIcon />}
//                             onClick={handleClickOpen}
//                         >
//                             Add Employee
//                         </Button>
//                     </div>
//                 </div>
//                 <TableContainer component={Paper} style={{ marginTop: '50px', paddingLeft: '10px' }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 {/* <TableCell>Profile</TableCell> */}
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Rate</TableCell>
//                                 <TableCell>Address</TableCell>
//                                 <TableCell>Position</TableCell>
//                                 <TableCell>Mail ID</TableCell>
//                                 <TableCell>Contact Number</TableCell>
//                                 <TableCell>DOB</TableCell>
//                                 <TableCell>Status</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//   {employees.map((employee, index) => (
//     <TableRow key={index}>
//       <TableCell>{employee.name}</TableCell>
//       <TableCell>{employee.rate}</TableCell>
//       <TableCell>{employee.address}</TableCell>
//       <TableCell>{employee.position}</TableCell>
//       <TableCell>{employee.email}</TableCell>
//       <TableCell>{employee.contact}</TableCell>
//       <TableCell>{employee.DOB}</TableCell>
//       <TableCell>
//         <div
//           style={{
//             backgroundColor: employee.status === 'Active' ? '#6bdb3f' : '#ff584b',
//             color: 'white',
//             display: 'inline-block',
//             padding: '5px',
//             borderRadius: '5px',
//           }}
//         >
//           {employee.status}
//           {/* Rest of your code for the Tooltip and EditIcon */}
//         </div>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>

//                     </Table>
//                 </TableContainer>
//             </div>
//             <Dialog open={open} onClose={handleClose} sx={{ minWidth: '600px' }}>
//                 {modalContent}
//             </Dialog>
//         </>
//     );
// };

import React from 'react'

export const Employeedetaihk = () => {
  return (
<></>
  )
}

