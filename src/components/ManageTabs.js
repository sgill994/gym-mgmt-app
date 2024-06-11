import React from 'react';

const ManageTabs = ({activeTab, setActiveTab}) => (
    <div id="tabs">
        <div 
        id="staff-tab"
        className={activeTab === 'staff' ? 'active' : ''}
        onClick={() => setActiveTab('staff')}>
            Staff
        </div>
        <div 
        id="memberships-tab"
        className={activeTab === 'memberships' ? 'active' : ''}
        onClick={() => setActiveTab('memberships')}>
            Memberships
        </div>
        <div 
        id="report-tabs"
        className={activeTab === 'reports' ? 'active' : ''}
        onClick={() => setActiveTab('reports')}>
            Reports
        </div>
        <div 
        id="settings-tab"
        className={activeTab === 'settings' ? 'active' : ''}
        onClick={() => setActiveTab('settings')}>
            Settings
        </div>
    </div>
);

export default ManageTabs;