import React from 'react';
import backgroundStyle from './notfounf.gif';

const NotFound = () => {
  const containerStyle = {
    position: 'relative',
  };

  

  return (
    <div style={{position: 'relative'}}>
      <img src={backgroundStyle} alt="" style={{ marginLeft:'300px' }} />
      <button style={{position: 'absolute',
    top: '79%',
    left: '51.9%',
    transform: 'translate(-50%, -50%)',
    padding: '10px 35px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',}} onClick={() => window.location.replace('/homepage')}>
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
