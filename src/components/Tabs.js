import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div id="tabs">
    <div
      id="members-tab"
      className={activeTab === 'members' ? 'active' : ''}
      onClick={() => setActiveTab('members')}
    >
      Members
    </div>
    <div
      id="manage-staff-tab"
      className={activeTab === 'staff' ? 'active' : ''}
      onClick={() => setActiveTab('staff')}
    >
      Manage Staff
    </div>
    <div
      id="manage-classes-tab"
      className={activeTab === 'classes' ? 'active' : ''}
      onClick={() => setActiveTab('classes')}
    >
      Manage Classes
    </div>
    <div
      id="reports-tab"
      className={activeTab === 'reports' ? 'active' : ''}
      onClick={() => setActiveTab('reports')}
    >
      Reports
    </div>
    <div
      id="leads-tab"
      className={activeTab === 'leads' ? 'active' : ''}
      onClick={() => setActiveTab('leads')}
    >
      Leads
    </div>
  </div>
);

export default Tabs;
