import React, { useState } from 'react';
import { Table, Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import MemberDetails from '../components/MemberDetails';

const MemberList = ({ members, filteredMembers, updateMember, deleteMember, setMemberArchived }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMemberID, setEditingMemberID] = useState(null);
  const [archivedStatus, setArchivedStatus] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const openMemberDetails = (member) => {
    setSelectedMember(member);
  };

  const closeMemberDetails = () => {
    setSelectedMember(null);
  };

  const handleEdit = (memberID, currentStatus) => {
    setEditingMemberID(memberID);
    setArchivedStatus(currentStatus);
  };

  const handleSave = (memberID) => {
    setMemberArchived(memberID, archivedStatus);
    setEditingMemberID(null);
  }

  const handleDelete = (member) => {
    setMemberToDelete(member);
    setDeleteModal(true);
  }

  const confirmDelete = () => {
    deleteMember(memberToDelete.memberID);
    setDeleteModal(false);
    setMemberToDelete(null);
  }

  const cancelDelete = () => {
    setDeleteModal(false);
    setMemberToDelete(null);
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>
                <a href="#" style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => openMemberDetails(member)}>
                  {member.firstName}
                </a>
              </td>
              <td>{member.lastName}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.email}</td>
              <td>
                {editingMemberID === member.memberID ? (
                  <DropdownButton id="dropdown-status-button" title={archivedStatus ? 'Archived' : 'Active'}>
                    <Dropdown.Item onClick={() => setArchivedStatus(false)}>Active</Dropdown.Item>
                    <Dropdown.Item onClick={() => setArchivedStatus(true)}>Archived</Dropdown.Item>
                  </DropdownButton>
                ) : (
                  member.archived ? 'Archived' : 'Active'
                )}
                {editingMemberID === member.memberID ? (
                  <Button variant="success" onClick={() => handleSave(member.memberID)}>Save</Button>
                ) : (
                  <Button varient="primary" onClick={() => handleEdit(member.memberID, member.archived)}>Edit</Button>
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(member)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Modal show={selectedMember !== null} onHide={closeMemberDetails} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Member Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && (<MemberDetails member={selectedMember} updateMember={updateMember} closeDetails={closeMemberDetails} members = {members}/>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={deleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete this member?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MemberList;
