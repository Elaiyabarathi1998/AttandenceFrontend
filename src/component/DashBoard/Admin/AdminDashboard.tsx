import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from '@mui/material/Container'; // Import the Container component
import { BiBriefcase, BiBuilding } from "react-icons/bi";
import { FaUsers, FaUser } from "react-icons/fa";
import PieChart from '../../chart/chart1';
// import BarChart from '../../chart/chart2';
// import CombinedChart from '../../chart/chart2';
import Chart  from '../../chart/chart1'
import Chart2 from '../../chart/chart2';
import AngleChart from '../../chart/chart';


export const AdminDashboard = () => {
  return (
    <div
    style={{
      position: 'absolute',
      left: '210px',
      bottom: '20px',
      width: 'calc(98% - 210px)',
      height: '82%',
      backgroundColor: '#b4c5e4',
      borderRadius: '6px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Add box shadow
    }}
    
>
  <h4 className='p-1 px-4'>Dashboard</h4>

  <div className='d-flex'>
    <Card
      style={{
        width: '230px',
        height: '120px',
        borderLeft: '4px solid #25d366', // Add a left-side border
      }}
      className='m-3 d-flex justify-content-between' // Add justify-content-between class
    >
      <Card.Body className='d-flex'>
      <div>
      <Card.Title className="fs-4">Employee</Card.Title> {/* Use fs-4 class for larger font size */}
      <Card.Text className="fs-1">100</Card.Text> {/* Use fs-5 class for even larger font size */}
    </div>
        <div className='px-5 mt-4'>
          <FaUsers size={40} style={{ color: '#0077b6' }} /> {/* Use FaUsers icon for people */}
        </div>
      </Card.Body>
    </Card>
    <Card
  style={{
    width: '230px',
    height: '120px',
    borderLeft: '4px solid #25d366', // Add a left-side border
  }}
  className='m-3 d-flex justify-content-between' // Add justify-content-between class
>
  <Card.Body className='d-flex justify-content-between'>
    <div>
      <Card.Title className="fs-4">Client</Card.Title>
      <Card.Text className="fs-1">50</Card.Text>
    </div>
    <div>
      <FaUser className = 'mt-4 'style={{ color: '#0077b6' }} size={30} /> {/* Use FaUser icon for person */}
    </div>
  </Card.Body>
</Card>

    <Card
      style={{
        width: '230px',
        height: '120px',
        borderLeft: '4px solid #25d366', // Add a left-side border
      }}
      className='m-3 d-flex justify-content-between' // Add justify-content-between class
    >
      <Card.Body className='d-flex justify-content-between'>
        <div>
        <Card.Title className="fs-4">Project</Card.Title>
        <Card.Text className="fs-1">20</Card.Text>
        </div>
        <div>
          <BiBriefcase  className = 'mt-4 'style={{ color: '#0077b6' }} size={30}  /> {/* Use BiBriefcase icon */}
        </div>
      </Card.Body>
    </Card>
    <Card
      style={{
        width: '230px',
        height: '120px',
        borderLeft: '4px solid #25d366', // Add a left-side border
      }}
      className='m-3 d-flex justify-content-between' // Add justify-content-between class
    >
       <Card.Body className='d-flex justify-content-between'>
        <div>
          <Card.Title className="fs-4">Department</Card.Title>
          <Card.Text className="fs-1">10</Card.Text>
        </div>
        <div>
          <BiBuilding className = 'mt-4 'style={{ color: '#0077b6' }} size={30} /> {/* Use BiBuilding icon */}
        </div>
      </Card.Body>
    </Card>
    
  </div>
<div style={{display:'flex'}}>
<div>
<Chart/>
</div>
<div >
<Chart2/>
</div>
<div  >
<AngleChart/>
</div>
</div>


      



</div>


  );
};
