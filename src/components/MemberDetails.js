import React, { useState } from 'react';
import Collapsible from './/CollapsibleSidebar';
import MemberDetailForm from './/MemberDetailForm'; 

const MemberDetails = ({ member, updateMember, closeDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMember, setUpdatedMember] = useState(member);
  const [showMemberDetailForm, setShowMemberDetailForm] = useState(false); // State to control form visibility

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedMember(member);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember({ ...updatedMember, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(updatedMember, member);
    setIsEditing(false);
    closeDetails();
  };

  const handleProfileClick = () => setShowMemberDetailForm(true);

  return (
    <div>
      <div className="flex-shrink-0 p-3" style={{ width: "280px", float:"left" }}>
        <a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
          <svg className="bi pe-none me-2" width="30" height="24"></svg>
          <span className="fs-5 fw-semibold">{member.firstName} {member.lastName}</span>
        </a>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            <i className="bi bi-person-vcard me-2"></i> 
            Overview
            </button>
          </li>
          <li className="mb-1">
            <a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" onClick={handleProfileClick}>
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            <i className="bi bi-pencil-square me-2"></i> 
            Profile Details
            </button>
            </a>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            <i className="bi bi-bell me-2"></i> 
            Notifications
            </button>
          </li>
          <li className="mb-1">
            <Collapsible title="Relationship" icon="bi-person-plus-fill">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a class="link-body-emphasis d-inline-flex text-decoration-none rounded" href="#" >Add Relationship</a></li>
              </ul>
            </Collapsible>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            <i className="bi bi-heart-pulse me-2"></i> 
            Activity
            </button>
          </li>
          <li className="mb-1">
            <Collapsible title="Attendance" icon="bi-clipboard-check">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Upcoming Schedule</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Attendance History</a></li>
              </ul>
            </Collapsible>
          </li>
          <li className="mb-1">
            <Collapsible title="Account" icon="bi-wallet">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Passes & Memberships</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Billing & Account Balance</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Purchases</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Transactions</a></li>
              </ul>
            </Collapsible>
          </li>
          <li className="mb-1">
            <Collapsible title="Rewards" icon="bi-trophy">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Earn Points</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Prizes</a></li>
              </ul>
            </Collapsible>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            <i className="bi bi-fire me-2"></i> 
            Belt History
            </button>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            <i className="bi bi-chat-dots me-2"></i> 
            Contact History
            </button>
          </li>
          <li className="mb-1">
            <Collapsible title="Documents" icon="bi-file-earmark-text">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Waiver</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Contracts</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Attachments</a></li>
              </ul>
            </Collapsible>
          </li>
        </ul>
      </div>
      {showMemberDetailForm && (
        <>
          <h2>Profile Detail</h2>
          <MemberDetailForm
            isEditing={isEditing}
            updatedMember={updatedMember}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            handleEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default MemberDetails;
