import React from 'react';
import MemberList from '../components/MemberList';

const ExistingMembersPage = ({ members }) => (
  <div id="existing-members" className="tab active">
    <h1>Existing Members</h1>
    <MemberList members={members} />
  </div>
);

export default ExistingMembersPage;
