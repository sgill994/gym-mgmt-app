import React, { useState } from 'react';
import { Table, Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import MemberDetails from './MemberDetails';
import { FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';

const MemberList = ({ members, updateMember, deleteMember, setMemberArchived }) => {
  // State variables
  const [selectedMember, setSelectedMember] = useState(null); // Member selected for detailed view
  const [editingMemberID, setEditingMemberID] = useState(null); // Member currently being edited
  const [archivedStatus, setArchivedStatus] = useState(null); // Archived status for editing
  const [deleteModal, setDeleteModal] = useState(false); // Delete confirmation modal
  const [memberToDelete, setMemberToDelete] = useState(null); // Member to be deleted

  // Open detailed view of member
  const openMemberDetails = (member) => {
    setSelectedMember(member);
  };

  // Close detailed view modal
  const closeMemberDetails = () => {
    setSelectedMember(null);
  };

  // Handle edit mode for member
  const handleEdit = (memberID, currentStatus) => {
    setEditingMemberID(memberID);
    setArchivedStatus(currentStatus === 'Yes');
  };

  // Save changes made to member (archive status)
  const handleSave = (memberID) => {
    setMemberArchived(memberID, archivedStatus ? 'Yes' : 'No');
    setEditingMemberID(null);
  };

  // Handle delete member action
  const handleDelete = (member) => {
    setMemberToDelete(member);
    setDeleteModal(true);
  };

  // Confirm member deletion
  const confirmDelete = () => {
    deleteMember(memberToDelete.memberID);
    setDeleteModal(false);
    setMemberToDelete(null);
  };

  // Cancel member deletion
  const cancelDelete = () => {
    setDeleteModal(false);
    setMemberToDelete(null);
  };

  return (
    <div>
      {/* Member List Table */}
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
                  // Dropdown for status edit
                  <DropdownButton id="dropdown-status-button" title={archivedStatus ? 'Archived' : 'Active'}>
                    <Dropdown.Item onClick={() => setArchivedStatus(false)}>Active</Dropdown.Item>
                    <Dropdown.Item onClick={() => setArchivedStatus(true)}>Archived</Dropdown.Item>
                  </DropdownButton>
                ) : (
                  // Display current status
                  member.archived === 'Yes' ? 'Archived' : 'Active'
                )}
                {editingMemberID === member.memberID ? (
                  // Save button during edit mode
                  <Button variant="success" onClick={() => handleSave(member.memberID)}><FaCheck /></Button>
                ) : (
                  // Edit button to enter edit mode
                  <Button variant="primary" onClick={() => handleEdit(member.memberID, member.archived)}><FaPencilAlt /></Button>
                )}
              </td>
              <td>
                {/* Delete button */}
                <Button variant="danger" onClick={() => handleDelete(member)}><FaTimes /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Confirmation message */}
          Are you sure you want to delete {memberToDelete && `${memberToDelete.firstName} ${memberToDelete.lastName}`}?
        </Modal.Body>
        <Modal.Footer>
          {/* Cancel delete button */}
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          {/* Confirm delete button */}
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* Display Member Details if selected */}
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
