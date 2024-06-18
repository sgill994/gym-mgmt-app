import React, { useState } from 'react';
import { Table, Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import MemberDetails from './MemberDetails';

const MemberList = ({ members, updateMember, deleteMember, setMemberArchived }) => {
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
    setArchivedStatus(currentStatus === 'Yes');
  };

  const handleSave = (memberID) => {
    setMemberArchived(memberID, archivedStatus ? 'Yes' : 'No');
    setEditingMemberID(null);
  };

  const handleDelete = (member) => {
    setMemberToDelete(member);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteMember(memberToDelete.memberID);
    setDeleteModal(false);
    setMemberToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
    setMemberToDelete(null);
  };

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
          {members.map((member, index) => (
            <tr key={index}>
              <td>
                <a
                  href="#"
                  style={{ color: 'blue', textDecoration: 'underline' }}
                  onClick={() => openMemberDetails(member)}
                >
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
                  member.archived === 'Yes' ? 'Archived' : 'Active'
                )}
                {editingMemberID === member.memberID ? (
                  <Button variant="success" onClick={() => handleSave(member.memberID)}>Save</Button>
                ) : (
                  <Button variant="primary" onClick={() => handleEdit(member.memberID, member.archived)}>Edit</Button>
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(member)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={deleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {memberToDelete && `${memberToDelete.firstName} ${memberToDelete.lastName}`}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {selectedMember && (
        <MemberDetails
          member={selectedMember}
          updateMember={updateMember}
          closeDetails={closeMemberDetails}
        />
      )}
    </div>
  );
};

export default MemberList;
