import React, { useState } from 'react';

const LeadDetails = ({ lead, updateLead, closeEditModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedLead, setUpdatedLead] = useState(lead);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedLead(lead);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdatedLead({...updatedLead, [name]: value,});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateLead(updatedLead, lead);
        setIsEditing(false);
        closeEditModal();
    };

    return (
        <div>
            <h2>Lead Details</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" name="firstName" value={updatedLead.firstName} onChange={handleChange} readOnly={!isEditing} />
                <label>Last Name:</label>
                <input type="text" name="lastName" value={updatedLead.lastName} onChange={handleChange} readOnly={!isEditing} />
                <label>Phone Number:</label>
                <input type="text" name="phoneNumber" value={updatedLead.phoneNumber} onChange={handleChange} readOnly={!isEditing} />
                <label>Email:</label>
                <input type="text" name="email" value={updatedLead.email} onChange={handleChange} readOnly={!isEditing} />
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
    )
};

export default LeadDetails;