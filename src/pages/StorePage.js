import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import StoreTabs from '../components/StorePage/StoreTabs';
import MembershipForm from '../components/StorePage/MembershipForm';

const StorePage = ({merch, addMerch, memberships, addMembership}) => {
  const [activeTab, setActiveTab] = useState('membership-options');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const newMembership = [];


  return (
    <div id="store" className="tab active">
      <StoreTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'membership-options' && (
        <>
        <h3>Membership Purchase Options
        <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleShow}>
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
              <i className="bi bi-pencil-square me-2"></i>
              Add Membership
            </button>
          </a>
          </h3>
          <Modal show={show} onHide={handleClose} className="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>New Membership Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <MembershipForm memberships={memberships} addMembership={addMembership} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
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
