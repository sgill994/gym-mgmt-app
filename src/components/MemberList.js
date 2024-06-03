import React from 'react';

const MemberList = ({ members }) => (
  <ul id="member-list">
    {members.map((member, index) => (
      <li key={index}>
        {member.firstName} {member.lastName} - {member.contactNumber}
      </li>
    ))}
  </ul>
);

export default MemberList;
