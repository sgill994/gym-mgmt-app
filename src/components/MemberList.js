import React from 'react';
import { Table } from 'react-bootstrap';
import MemberDetails from '../components/MemberDetails';

const MemberList = ({ members, updateMember }) => {
  const openMemberDetails = (member) => {
    const memberInfo = MemberDetails({ member, updateMember });
    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(memberInfo);
    newWindow.document.close();
  };

  return (
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
  );
}

export default MemberList;
