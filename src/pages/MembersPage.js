import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewMemberForm from '../components/NewMemberForm';
import MemberList from '../components/MemberList';
import MemberTabs from '../components/MemberTabs';
import ExportCSV from '../components/ExportCSV'; 
import ImportCSV from '../components/ImportCSV'; 

const MembersPage = ({ addMember, updateMember, deleteMember, setMemberArchived }) => {
  // State variables
  const [activeTab, setActiveTab] = useState('active-members'); // Active tab (active-members or archived-members)
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [members, setMembers] = useState([]); // List of members

  // Open modal to add new member
  const handleOpen = () => setShowModal(true);

  // Close modal
  const handleClose = () => setShowModal(false);

  // Callback function to handle imported CSV data
  const handleImportCSV = (importedData) => {
    setMembers([...members, ...importedData]); // Add imported data to members state

    // Process imported data and add members
    importedData.forEach((member) => {
      addMember(member); // Add each member using addMember function
    });

    // Optionally close modal or provide feedback
    handleClose();
  };
  
  console.log('Current members data:', members);

  

  return (
    <div id="members" className="tab active">
      <h1>Members</h1>
      <MemberTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'active-members' && (
        <>
          {/* Button to open modal for adding new member */}
          <Button variant="primary" onClick={handleOpen}>Add New Member</Button>
          {/* Modal for adding new member */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewMemberForm addMember={(member) => { addMember(member); handleClose(); }} />
            </Modal.Body>
          </Modal>
          <h3>Active Members</h3>
          {/* Display list of active members */}
          <MemberList
            members={members.filter(member => !member.archived)} // Filter active members
            updateMember={updateMember}
            deleteMember={deleteMember}
            setMemberArchived={setMemberArchived}
          />
        </>
      )}

      {activeTab === 'archived-members' && (
        <>
          <h3>Archived Members</h3>
          {/* Display list of archived members */}
          <MemberList
            members={members.filter(member => member.archived)} // Filter archived members
            updateMember={updateMember}
            deleteMember={deleteMember}
            setMemberArchived={setMemberArchived}
          />
        </>
      )}

      {/* Export members to CSV */}
      <ExportCSV members={members} />

      {/* Import CSV data */}
      <ImportCSV onImportCSV={handleImportCSV} />
    </div>
  );
};

export default MembersPage;
