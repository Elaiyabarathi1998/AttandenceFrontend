import React, { useState } from 'react';
import { EmployeeProfile } from './EmployeeProfile';
import { TimeRegister } from './TimeRegister';
import { HelpDesk } from './HelpDesk';
import UserSidenavbar from './UserSideNav';
import PrimarySearchAppBar from '../../layoutNav/TopNavbar';
import EmployeePrimarySearchAppBar from './userTopNav';

export const EmployeeDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('EmployeeProfile');

  return (

    <>
    <EmployeePrimarySearchAppBar/>
    <div style={{ display: 'flex' }}>
      
      
      <UserSidenavbar setActiveComponent={setActiveComponent} />
      <div style={{ flex: 1 }}>
        {activeComponent === 'EmployeeProfile' && <EmployeeProfile />}
        {activeComponent === 'TimeRegister' && <TimeRegister />}
        {activeComponent === 'HelpDesk' && <HelpDesk />}
      </div>
    </div>
    </>
  );
};
