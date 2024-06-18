import React, { useState } from 'react';

const MemberDetails = ({ member, updateMember, closeDetails }) => {
  // State variables
  const [isEditing, setIsEditing] = useState(false); // Edit mode flag
  const [updatedMember, setUpdatedMember] = useState(member); // Updated member details

  // Enter edit mode
  const handleEdit = () => setIsEditing(true);

  // Cancel edit mode and reset to original member details
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedMember(member);
  };

  // Handle input change for member details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember({ ...updatedMember, [name]: value });
  };

  // Submit updated member details
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(updatedMember);
    setIsEditing(false);
    closeDetails();
  };

  return (
    <div>
      <h2>Member Details</h2>
      <form className="memberDetailsForm" onSubmit={handleSubmit}>
        {/* First Name */}
        <label>First Name:</label>
        <input type="text" name="firstName" value={updatedMember.firstName} onChange={handleChange} readOnly={!isEditing} />
        {/* Last Name */}
        <label>Last Name:</label>
        <input type="text" name="lastName" value={updatedMember.lastName} onChange={handleChange} readOnly={!isEditing} />
        {/* Phone Number */}
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={updatedMember.phoneNumber} onChange={handleChange} readOnly={!isEditing} />
        {/* Email */}
        <label>Email:</label>
        <input type="text" name="email" value={updatedMember.email} onChange={handleChange} readOnly={!isEditing} />
        {/* Edit and Cancel buttons */}
        {isEditing && (
          <>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </>
        )}
        {/* Edit button */}
        {!isEditing && (
          <button type="button" onClick={handleEdit}>Edit</button>
        )}
      </form>
      {/* Close button */}
      <button onClick={closeDetails}>Close</button>
    </div>
  );
};

export default MemberDetails;
