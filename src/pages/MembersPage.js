import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewMemberForm from '../components/NewMemberForm';
import MemberList from '../components/MemberList';
import MemberTabs from '../components/MemberTabs';

const MembersPage = ({ members, addMember, updateMember, setArchived }) => {
  const [activeTab, setActiveTab] = useState('active-members');
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div id="members" className="tab active">
      <h1>Members</h1>
      <MemberTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'active-members' && (
        <>
      <Button variant="primary" onClick={handleOpen}>Add New Member</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewMemberForm addMember={(member) => {addMember(member); handleClose();}} />
        </Modal.Body>
      </Modal>
      <h3>Active Members</h3>
      <MemberList members={members.filter(member => !member.archived)} updateMember={updateMember} setArchived={setArchived} />
      </>
      )}
      {activeTab === 'archived-members' && (
        <>
        <h3>Archived Members</h3>
        <MemberList members={members.filter(member => member.archived)} updateMember={updateMember} setArchived={setArchived} />
        </>
      )}
    </div>
  );
};

export default MembersPage;
