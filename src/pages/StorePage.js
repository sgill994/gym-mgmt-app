import React, { useState } from 'react';
import StoreTabs from '../components/StoreTabs';

const StorePage = ({merch, addMerch, memberships, addMembership}) => {
  const [activeTab, setActiveTab] = useState('membership-options');

  return (
    <div id="store" className="tab active">
      <StoreTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'membership-options' && (
        <>
        <h3>Membership Purchase Options</h3>
        </>
      )}
      {activeTab === 'merchandise' && (
        <>
        <h3>Merchandise Purchase Options</h3>
        </>
      )}
    </div>
  );
}

export default StorePage;
