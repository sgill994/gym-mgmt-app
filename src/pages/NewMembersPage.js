import React from 'react';
import NewMemberForm from '../components/NewMemberForm';

const NewMembersPage = ({ addMember }) => (
  <div id="new-members" className="tab active">
    <h1>New Members</h1>
    <NewMemberForm  />
  </div>
);

export default NewMembersPage;
