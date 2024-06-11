import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewMemberForm from '../components/NewMemberForm';
import MemberList from '../components/MemberList';
import MemberTabs from '../components/MemberTabs';

const MembersPage = ({ members, addMember, updateMember }) => {
  const [activeTab, setActiveTab] = useState('active-members');
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div id="members" className="tab active">
      <MemberTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'active-members' && (
        <>
      <h1>Members</h1>
      <Button variant="primary" onClick={handleOpen}>Add New Member</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewMemberForm addMember={(member) => {addMember(member); handleClose();}} />
        </Modal.Body>
      </Modal>
      <h2>Active Members</h2>
      <MemberList members={members} updateMember={updateMember} />
      </>
      )}
    </div>
  );
};

export default MembersPage;
