import React, { useState } from 'react';
import { Table, Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import MemberDetails from '../components/MemberDetails';

const MemberList = ({ members, updateMember, setMemberArchived }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMemberID, setEditingMemberID] = useState(null);
  const [archivedStatus, setArchivedStatus] = useState(null);

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
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
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
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={selectedMember !== null} onHide={closeMemberDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Member Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && (<MemberDetails member={selectedMember} updateMember={updateMember} closeDetails={closeMemberDetails} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MemberList;
