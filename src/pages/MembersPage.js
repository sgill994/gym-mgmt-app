import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewMemberForm from '../components/NewMemberForm';
import MemberList from '../components/MemberList';
import MemberTabs from '../components/MemberTabs';
import ImportCSV from '../components/ImportCSV';
import ExportCSV from '../components/ExportCSV';

const MembersPage = ({ members, addMember, updateMember, deleteMember, setMemberArchived }) => {
  const [activeTab, setActiveTab] = useState('active-members');
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleImportCSV = (importedData) => {
    // Process imported data and add members
    importedData.forEach((member) => {
      // Convert archived field to boolean
      if (typeof member.archived !== 'boolean') {
        member.archived = member.archived.toLowerCase() === 'yes';
      } else {
        member.archived = false;
      }
      addMember(member); // Add each member using addMember function
    });
    // Optionally close modal or provide feedback
    console.log('Imported members data:', importedData);
  };

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
      {/* Export members to CSV */}
      <ExportCSV members={members} />

      {/* Import members from CSV */}
      <ImportCSV onImportCSV={handleImportCSV} />
    </div>
  );
};

export default MembersPage;
