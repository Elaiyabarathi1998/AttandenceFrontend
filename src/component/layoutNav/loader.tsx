import React from 'react'
import tino from "./tino.gif";

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={tino} alt="" />
    </div>
  )
}

export default Loader