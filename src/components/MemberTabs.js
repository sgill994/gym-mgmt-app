import React from 'react';

const MemberTabs = ({activeTab, setActiveTab}) => (
    <div id="tabs">
        <div 
        id="active-members-tab" 
        className={activeTab === 'active-members' ? 'active' : ''}
        onClick={() => setActiveTab('active-members')}>
            Active Members
        </div>
        <div 
        id="archived-members-tab"
        className={activeTab === 'archived-members' ? 'active' : ''}
        onClick={() => setActiveTab('archived-members')}>
            Archived Members
        </div>
    </div>
);

export default MemberTabs;