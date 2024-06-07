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
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={updatedMember.firstName} onChange={handleChange} readOnly={!isEditing} />
        <label>Last Name:</label>
        <input type="text" name="lastName" value={updatedMember.lastName} onChange={handleChange} readOnly={!isEditing} />
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={updatedMember.phoneNumber} onChange={handleChange} readOnly={!isEditing} />
        <label> Email: </label>
        <input type="text" name="email" value={updatedMember.email} onChange={handleChange} readOnly={!isEditing} />
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
