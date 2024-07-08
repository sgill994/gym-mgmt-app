import React from 'react';

const LeadTabs = ({activeTab, setActiveTab}) => (
    <div id="tabs">
        <div 
        id="active-leads-tab" 
        className={activeTab === 'active-leads' ? 'active' : ''}
        onClick={() => setActiveTab('active-leads')}>
            Active Leads
        </div>
        <div 
        id="archived-leads-tab"
        className={activeTab === 'archived-leads' ? 'active' : ''}
        onClick={() => setActiveTab('archived-leads')}>
            Archived Leads
        </div>
    </div>
);

export default LeadTabs;