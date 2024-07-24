import React from 'react';

const MemberDetailForm = ({ isEditing, updatedMember, handleChange, handleSubmit, handleCancel, handleEdit }) => {
  return (
    <form className="memberDetailsForm" onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input type="text" name="firstName" value={updatedMember.firstName} onChange={handleChange} readOnly={!isEditing} />
      <label>Last Name:</label>
      <input type="text" name="lastName" value={updatedMember.lastName} onChange={handleChange} readOnly={!isEditing} />
      <label>Phone Number:</label>
      <input type="text" name="phoneNumber" value={updatedMember.phoneNumber} onChange={handleChange} readOnly={!isEditing} />
      <label>Email:</label>
      <input type="text" name="email" value={updatedMember.email} onChange={handleChange} readOnly={!isEditing} />
      <label>Customer Notes:</label>
      <textarea name="customerComments" value={updatedMember.customerComments} onChange={handleChange} readOnly={!isEditing} />
      <label>Date of Birth:</label>
      <input type="text" name="dateOfBirth" value={updatedMember.dateOfBirth} onChange={handleChange} readOnly={!isEditing} />
      <label>Referral Source:</label>
      <input type="text" name="referralSource" value={updatedMember.referralSource} onChange={handleChange} readOnly={!isEditing} />
      <label>Street Address:</label>
      <input type="text" name="streetAddress" value={updatedMember.streetAddress} onChange={handleChange} readOnly={!isEditing} />
      <label>City:</label>
      <input type="text" name="city" value={updatedMember.city} onChange={handleChange} readOnly={!isEditing} />
      <label>Postal Code:</label>
      <input type="text" name="postalCode" value={updatedMember.postalCode} onChange={handleChange} readOnly={!isEditing} />
      <label>Emergency Contact Name:</label>
      <input type="text" name="emergencyContactName" value={updatedMember.emergencyContactName} onChange={handleChange} readOnly={!isEditing} />
      <label>Emergency Contact Phone:</label>
      <input type="text" name="emergencyContactPhone" value={updatedMember.emergencyContactPhone} onChange={handleChange} readOnly={!isEditing} />
      {isEditing ? (
        <>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <button type="button" onClick={handleEdit}>Edit</button>
      )}
    </form>
  );
};

export default MemberDetailForm;
