import React, { useState } from 'react';

const MemberDetails = ({ member, updateMember, closeDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMember, setUpdatedMember] = useState(member);

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

  return (
    <div>
      <h2>Member Details</h2>
      <form className="memberDetailsForm" onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={updatedMember.firstName} onChange={handleChange} readOnly={!isEditing} />
        <label>Last Name:</label>
        <input type="text" name="lastName" value={updatedMember.lastName} onChange={handleChange} readOnly={!isEditing} />
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={updatedMember.phoneNumber} onChange={handleChange} readOnly={!isEditing} />
        <label> Email: </label>
        <input type="text" name="email" value={updatedMember.email} onChange={handleChange} readOnly={!isEditing} />
        <label> Customer Notes: </label>
        <textarea type="text" name="email" value={updatedMember.customerComments} onChange={handleChange} readOnly={!isEditing} />
        <label> Date of Birth: </label>
        <input type="text" name="email" value={updatedMember.dateOfBirth} onChange={handleChange} readOnly={!isEditing} />
        <label> Referral Source: </label>
        <input type="text" name="email" value={updatedMember.referralSource} onChange={handleChange} readOnly={!isEditing} />
        <label> Street Adress: </label>
        <input type="text" name="email" value={updatedMember.streetAddress} onChange={handleChange} readOnly={!isEditing} />
        <label> City: </label>
        <input type="text" name="email" value={updatedMember.city} onChange={handleChange} readOnly={!isEditing} />
        <label> Postal Code: </label>
        <input type="text" name="email" value={updatedMember.postalCode} onChange={handleChange} readOnly={!isEditing} />
        <label> Emergency Contact Name: </label>
        <input type="text" name="email" value={updatedMember.emergencyContactName} onChange={handleChange} readOnly={!isEditing} />
        <label> Emergency Contact Phone: </label>
        <input type="text" name="email" value={updatedMember.emergencyContactPhone} onChange={handleChange} readOnly={!isEditing} />
        {isEditing && (
          <>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </>
        )}
        {!isEditing && (
            <button type="button" onClick={handleEdit}>Edit</button>
        )}
      </form>
    </div>
  );
};

export default MemberDetails;
