import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewMemberForm from '../components/NewMemberForm';
import MemberList from '../components/MemberList';
import MemberTabs from '../components/MemberTabs';
import ImportCSV from '../components/importCSV';
import ExportCSV from '../components/ExportCSV';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

const MembersPage = ({ members, addMember, updateMember, deleteMember, setMemberArchived }) => {
  const [activeTab, setActiveTab] = useState('active-members');
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Function to handle imported CSV data
  const handleImportCSV = (importedData) => {
    const processedData = importedData.map((member) => ({
      ...member,
      archived: member.archived === 'yes' || member.archived === true,
      memberID: member.memberID || uuidv4(), // Ensure memberID is correctly passed
      firstName: member.firstName,
      lastName: member.lastName,
      phoneNumber: member.phoneNumber,
      email: member.email,
      dateOfBirth: member.dateOfBirth,
      customerComments: member.customerComments,
      referralSource: member.referralSource,
      customCustomerID: member.customCustomerID,
      streetAddress: member.streetAddress,
      city: member.city,
      postalCode: member.postalCode,
      province: member.province,
      country: member.country,
      emergencyContactName: member.emergencyContactName,
      emergencyContactPhone: member.emergencyContactPhone
    }));

    console.log('Processed Data:', processedData); // Log processed data
  
    processedData.forEach((member) => {
      addMember(member); // Add each processed member to state
    });
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
