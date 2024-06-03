import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div id="tabs">
    <div
      id="new-members-tab"
      className={activeTab === 'new' ? 'active' : ''}
      onClick={() => setActiveTab('new')}
    >
      New Members
    </div>
    <div
      id="existing-members-tab"
      className={activeTab === 'existing' ? 'active' : ''}
      onClick={() => setActiveTab('existing')}
    >
      Existing Members
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
  </div>
);

export default Tabs;
