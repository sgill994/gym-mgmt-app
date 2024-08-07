import React, { useState } from 'react';
import Collapsible from './CollapsibleSidebar';
import ProfileDetailForm from './MembersDetailPage/ProfileDetail';
import ProfileOverview from './MembersDetailPage/ProfileOverview';
import NotificationsForm from './MembersDetailPage/NotificationsForm';
import ActivityForm from './MembersDetailPage/ActivityForm';
import AttendanceForm from './MembersDetailPage/AttendanceForm';
import AccountForm from './MembersDetailPage/AccountForm';
import RewardsForm from './MembersDetailPage/RewardsForm';
import BeltHistoryForm from './MembersDetailPage/BeltHistoryForm';
import ContactHistoryForm from './MembersDetailPage/ContactHistoryForm';
import WaiverForm from './MembersDetailPage/WaiverForm';
import AddRelationship from './MembersDetailPage/AddRelationship';

const MemberDetails = ({ members, member, updateMember, closeDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMember, setUpdatedMember] = useState(member);
  const [currentForm, setCurrentForm] = useState(null);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedMember(member);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember({ ...updatedMember, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedMember({
        ...updatedMember,
        profilePicture: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(updatedMember);
    setIsEditing(false);
    closeDetails();
  };

  const handleSaveRelationships = (updatedMember) => {
    updateMember(updatedMember, member);
  };

  const handleLinkClick = (form) => () => setCurrentForm(form);

  const waiverSignedCheck = () => {
    if(updatedMember.waiverSigned === false){
      return (
        <a 
          href="#" 
          className="link-body-emphasis d-inline-flex text-decoration-none rounded" 
          onClick={handleLinkClick('WaiverForm')}
        >
          Waiver <i className="bi bi-ban ms-1"></i>
        </a>
      );
    }
    else{
      return (
        <a 
          href="#" 
          className="link-body-emphasis d-inline-flex text-decoration-none rounded" 
          onClick={handleLinkClick('WaiverForm')}
        >
          Waiver
        </a>
      );
    }
  };

  return (
    <div>
      <div className="flex-shrink-0 p-3" style={{ width: "20%", float: "left" }}>
        <a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
          <svg className="bi pe-none me-2" width="30" height="24"></svg>
          <span className="fs-5 fw-semibold">{member.firstName} {member.lastName}</span>
        </a>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('ProfileOverview')}>
              <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                <i className="bi bi-person-vcard me-2"></i>
                Overview
              </button>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('ProfileDetailForm')}>
              <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                <i className="bi bi-pencil-square me-2"></i>
                Profile Details
              </button>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('NotificationsForm')}>
              <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                <i className="bi bi-bell me-2"></i>
                Notifications
              </button>
            </a>
          </li>
          <li className="mb-1">
            <Collapsible title="Relationship" icon="bi-person-plus-fill">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={() => setCurrentForm('AddRelationship')}>Add Relationship</a></li>
              </ul>
            </Collapsible>
          </li>
          <li className="mb-1">
            <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('ActivityForm')}>
              <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                <i className="bi bi-heart-pulse me-2"></i>
                Activity
              </button>
            </a>
          </li>
          <li className="mb-1">
            <Collapsible title="Attendance" icon="bi-clipboard-check">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('AttendanceForm')}>Upcoming Schedule</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('AttendanceHistoryForm')}>Attendance History</a></li>
              </ul>
            </Collapsible>
          </li>
          <li className="mb-1">
            <Collapsible title="Account" icon="bi-wallet">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('AccountForm')}>Passes & Memberships</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('BillingForm')}>Billing & Account Balance</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('PurchasesForm')}>Purchases</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('TransactionsForm')}>Transactions</a></li>
              </ul>
            </Collapsible>
          </li>
          <li className="mb-1">
            <Collapsible title="Rewards" icon="bi-trophy">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('RewardsForm')}>Earn Points</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('PrizesForm')}>Prizes</a></li>
              </ul>
            </Collapsible>
          </li>
          <li className="mb-1">
            <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('BeltHistoryForm')}>
              <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                <i className="bi bi-fire me-2"></i>
                Belt History
              </button>
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('ContactHistoryForm')}>
              <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
                <i className="bi bi-chat-dots me-2"></i>
                Contact History
              </button>
            </a>
          </li>
          <li className="mb-1">
            <Collapsible title="Documents" icon="bi-file-earmark-text">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                {waiverSignedCheck()}
                </li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('ContractsForm')}>Contracts</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleLinkClick('AttachmentsForm')}>Attachments</a></li>
              </ul>
            </Collapsible>
          </li>
        </ul>
      </div>
      {currentForm === 'ProfileDetailForm' &&
        <ProfileDetailForm
          isEditing={isEditing}
          updatedMember={updatedMember}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleFileChange={handleFileChange} 
          members={members}
        />}
      {currentForm === 'ProfileOverview' && <ProfileOverview member={member}/>}
      {currentForm === 'NotificationsForm' && <NotificationsForm />}
      {currentForm === 'AddRelationship' &&
        <AddRelationship
          members={members}
          member={updatedMember}
          setUpdatedMember={setUpdatedMember}
          updateMember={handleSaveRelationships}
        />}
      {currentForm === 'ActivityForm' && <ActivityForm />}
      {currentForm === 'AttendanceForm' && <AttendanceForm />}
      {currentForm === 'AttendanceHistoryForm' && <AttendanceHistoryForm />}
      {currentForm === 'AccountForm' && <AccountForm />}
      {currentForm === 'BillingForm' && <BillingForm />}
      {currentForm === 'PurchasesForm' && <PurchasesForm />}
      {currentForm === 'TransactionsForm' && <TransactionsForm />}
      {currentForm === 'RewardsForm' && <RewardsForm />}
      {currentForm === 'PrizesForm' && <PrizesForm />}
      {currentForm === 'BeltHistoryForm' && <BeltHistoryForm />}
      {currentForm === 'ContactHistoryForm' && <ContactHistoryForm />}
      {currentForm === 'WaiverForm' && 
      <WaiverForm
        members={members}
        member={updatedMember}
        updateMember={updateMember}
        updatedMember = {updatedMember}
        setUpdatedMember = {setUpdatedMember}
      />}
      {currentForm === 'ContractsForm' && <ContractsForm />}
      {currentForm === 'AttachmentsForm' && <AttachmentsForm />}
    </div>
  );
};

export default MemberDetails;