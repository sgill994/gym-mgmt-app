import React, { useState } from 'react';

const App = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('new');

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  return (
    <div>
      <h1>Gym Membership Management</h1>
      <div id="tabs">
        <div
          id="new-members-tab"
          className={activeTab === 'new' ? 'active' : ''}
          onClick={() => setActiveTab('new')}
        >
          New Members
        </div>
        <div
          id="existing-members-tab"
          className={activeTab === 'existing' ? 'active' : ''}
          onClick={() => setActiveTab('existing')}
        >
          Existing Members
        </div>
      </div>
      {activeTab === 'new' && (
        <div id="new-members" className="tab active">
          <h1>New Members</h1>
          <form
            id="new-member-form"
            onSubmit={(e) => {
              e.preventDefault();
              const firstName = e.target['first-name'].value;
              const lastName = e.target['last-name'].value;
              const contactNumber = e.target['contact-number'].value;
              addMember({ firstName, lastName, contactNumber });
              e.target.reset();
            }}
          >
            <label htmlFor="first-name">First Name:</label>
            <input type="text" id="first-name" required /><br />
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" id="last-name" required /><br />
            <label htmlFor="contact-number">Contact Number:</label>
            <input type="text" id="contact-number" required /><br />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      {activeTab === 'existing' && (
        <div id="existing-members" className="tab active">
          <h1>Existing Members</h1>
          <ul id="member-list">
            {members.map((member, index) => (
              <li key={index}>
                {member.firstName} {member.lastName} - {member.contactNumber}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
