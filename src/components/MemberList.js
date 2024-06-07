import React, { useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import MemberDetails from '../components/MemberDetails';

const MemberList = ({ members, updateMember }) => {
  const [selectedMember, setSelectedMember] = useState(null);

  const openMemberDetails = (member) => {
    setSelectedMember(member);
  };

  const closeMemberDetails = () => {
    setSelectedMember(null);
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
