import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewMemberForm from '../components/NewMemberForm';
import MemberList from '../components/MemberList';
import MemberTabs from '../components/MemberTabs';
import ExportCSV from '../components/exportCSV';
import ImportCSV from '../components/importCSV';

const MembersPage = ({ members, addMember, updateMember, deleteMember, setMemberArchived }) => {
  const [activeTab, setActiveTab] = useState('active-members');
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Callback function to handle imported CSV data
  const handleImportCSV = (importedData) => {

    console.log('Imported data:', importedData);
    // Merge importedData with current members state
    const updatedMembers = [...members, ...importedData];
    
    console.log('Updated members before adding:', updatedMembers);
    // Update state with new members
    updatedMembers.forEach(member => addMember(member));
    console.log('Updated members after adding:', updatedMembers);

    // Optionally close modal or provide feedback
    handleClose();
  };

  // Log members array when activeTab changes
  console.log('Current active tab:', activeTab);
  console.log('Current members array:', members);

  return (
    <div id="members" className="tab active">
      <h1>Members</h1>
      <MemberTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'active-members' && (
        <>
      <Button variant="primary" onClick={handleOpen}>Add New Member</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewMemberForm addMember={(member) => {addMember(member); handleClose();}} />
        </Modal.Body>
      </Modal>
      <h3>Active Members</h3>
      <MemberList 
      members={members.filter(member => !member.archived)}
      updateMember={updateMember} 
      deleteMember={deleteMember}
      setMemberArchived={setMemberArchived} />
      </>
      )}
      {activeTab === 'archived-members' && (
        <>
        <h3>Archived Members</h3>
        <MemberList 
        members={members.filter(member => member.archived)} 
        updateMember={updateMember} 
        deleteMember={deleteMember}
        setMemberArchived={setMemberArchived} />
        </>
      )}
      <ExportCSV members={members} />
      <ImportCSV onImportCSV={handleImportCSV} /> {/* Pass the callback to handle imported CSV data */}
    </div>
  );
};

export default MembersPage;
