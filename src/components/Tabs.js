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
      id="manage-tab"
      className={activeTab === 'manage' ? 'active' : ''}
      onClick={() => setActiveTab('manage')}
    >
      Manage
    </div>
    <div 
      id="schedule-tab"
      className={activeTab === 'schedule' ? 'active' : ''}
      onClick={() => setActiveTab('schedule')}
    >
      Schedule 
    </div>
    <div
      id="classes-tab"
      className={activeTab === 'classes' ? 'active' : ''}
      onClick={() => setActiveTab('classes')}
    >
      Classes
    </div>
    <div
      id="leads-tab"
      className={activeTab === 'leads' ? 'active' : ''}
      onClick={() => setActiveTab('leads')}
    >
      Leads
    </div>
    <div
      id="store-tab"
      className={activeTab === 'store' ? 'active' : ''}
      onClick={() => setActiveTab('store')}
    >
      Store
    </div>
  </div>
);

export default Tabs;
