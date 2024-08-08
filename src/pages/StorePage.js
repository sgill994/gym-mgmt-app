import React, { useState } from 'react';
import StoreTabs from '../components/StorePage/StoreTabs';
import MembershipForm from '../components/StorePage/MembershipForm';

const StorePage = ({merch, addMerch, memberships, addMembership}) => {
  const [activeTab, setActiveTab] = useState('membership-options');
  const [currentStore, setCurrentStore] = useState(null);
  const handleLinkClick = (form) => () => setCurrentStore(form);


  return (
    <div id="store" className="tab active">
      <StoreTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'membership-options' && (
        <>
        <h3>Membership Purchase Options
        <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('MembershipForm')}>
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
              <i className="bi bi-pencil-square me-2"></i>
              Add Membership
            </button>
          </a>
          </h3>
          {currentStore === 'MembershipForm' && <MembershipForm />}
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
