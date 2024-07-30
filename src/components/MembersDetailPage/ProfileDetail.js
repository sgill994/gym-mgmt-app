import React from 'react';
import blankProfilePicture from '../../assets/images/defaultprofilepicture.png'; // Adjust path as needed

const ProfileDetailForm = ({ isEditing, updatedMember, handleChange, handleSubmit, handleCancel, handleEdit, handleFileChange, members }) => {
  
    // Map relationship IDs to their respective member details
    const getRelationshipDetails = (relationshipIDs) => {
      return relationshipIDs.map(id => {
        const member = members.find(m => m.memberID === id);
        return member ? { firstName: member.firstName, lastName: member.lastName } : null;
      }).filter(member => member); // Filter out null values
    };
  
    const relationshipDetails = getRelationshipDetails(updatedMember.relationships || []);
  

  return (
    <div className="memberDetailsForm">
      <div className="scrollable-form-container">
      <form onSubmit={handleSubmit}>
        <div className='userInfo'>
          <div className='profilepic mb-3'>
            <div className="mb-3">
              <img
                src={updatedMember.profilePicture ? URL.createObjectURL(updatedMember.profilePicture) : blankProfilePicture}
                alt="Profile"
                className="img-thumbnail"
                style={{ width: '150px', height: '150px' }}
              />
            </div>
            {isEditing && (
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                name="profilePicture"
                onChange={handleFileChange}
              />
            )}
          </div>
          <div className="mb-3">
            <label>First Name:</label>
            <input 
              type="text" 
              name="firstName" 
              value={updatedMember.firstName} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Last Name:</label>
            <input 
              type="text" 
              name="lastName" 
              value={updatedMember.lastName} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Phone Number:</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={updatedMember.phoneNumber} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input 
              type="text" 
              name="email" 
              value={updatedMember.email} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Customer Notes:</label>
            <textarea 
              name="customerComments" 
              value={updatedMember.customerComments} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Date of Birth:</label>
            <input 
              type="text" 
              name="dateOfBirth" 
              value={updatedMember.dateOfBirth} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Referral Source:</label>
            <input 
              type="text" 
              name="referralSource" 
              value={updatedMember.referralSource} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Street Address:</label>
            <input 
              type="text" 
              name="streetAddress" 
              value={updatedMember.streetAddress} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>City:</label>
            <input 
              type="text" 
              name="city" 
              value={updatedMember.city} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Postal Code:</label>
            <input 
              type="text" 
              name="postalCode" 
              value={updatedMember.postalCode} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Emergency Contact Name:</label>
            <input 
              type="text" 
              name="emergencyContactName" 
              value={updatedMember.emergencyContactName} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
          <div className="mb-3">
            <label>Emergency Contact Phone:</label>
            <input 
              type="text" 
              name="emergencyContactPhone" 
              value={updatedMember.emergencyContactPhone} 
              onChange={handleChange} 
              className="form-control"
              disabled={!isEditing} 
              readOnly={!isEditing} 
            />
          </div>
        </div>
        <div className='userRelationship'>
            <h2 className="mb-4">Relationships</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {relationshipDetails.length > 0 ? (
                  relationshipDetails.map((relationship, index) => (
                    <tr key={index}>
                      <td>{relationship.firstName}</td>
                      <td>{relationship.lastName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No relationships found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        {isEditing ? (
          <>
          <div className='userButton'>
            <button className="btn btn-primary" type="submit" style={{marginRight: '5px'}}>Save Changes</button>
            <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancel</button>
          </div>
          </>
        ) : (
          <div className='userButton'>
          <button className="btn btn-primary" type="button" onClick={handleEdit}>Edit</button>
          </div>
        )}
      </form>
      </div>
    </div>
  );
};

export default ProfileDetailForm;
