import React, { useState } from 'react';
import ManageTabs from '../components/ManageTabs';

const ManagePage = ({employees, addEmployee, updateEmployee}) => {
  const [activeTab, setActiveTab] = useState('staff');

  return (
    <div id="manage" className="tab active">
      <ManageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'staff' && (
        <>
        <h3>Staff Secondary</h3>
        </>
      )}
      {activeTab === 'memberships' && (
        <>
        <h3>Memberships Secondary</h3>
        </>
      )}
      {activeTab === 'reports' && (
        <>
        <h3>Reports Secondary</h3>
        </>
      )}
      {activeTab === 'settings' && (
        <>
        <h3>Settings Secondary</h3>
        </>
      )}
    </div>
  );
}

export default ManagePage;
