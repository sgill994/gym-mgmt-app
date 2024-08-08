import React from 'react';

const StoreTabs = ({activeTab, setActiveTab}) => (
    <div id="tabs">
        <div 
        id="memberships-tab"
        className={activeTab === 'membership-options' ? 'active' : ''}
        onClick={() => setActiveTab('membership-options')}>
            Memberships
        </div>
        <div 
        id="merchandise-tab"
        className={activeTab === 'merchandise' ? 'active' : ''}
        onClick={() => setActiveTab('merchandise')}>
            Merchandise
        </div>
    </div>
);

export default StoreTabs;