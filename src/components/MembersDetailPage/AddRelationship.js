import React, { useState, useEffect } from 'react';

const relationshipTypes = ['Parent', 'Child', 'Relative', 'Sibling'];

const AddRelationship = ({ members, member, setUpdatedMember, updateMember }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [relationshipType, setRelationshipType] = useState({});

  useEffect(() => {
    if (member && Array.isArray(member.relationships)) {
      const initialSelectedMembers = member.relationships.map(rel => rel.memberID);
      const initialRelationshipType = member.relationships.reduce((acc, rel) => {
        acc[rel.memberID] = rel.type;
        return acc;
      }, {});

      setSelectedMembers(initialSelectedMembers);
      setRelationshipType(initialRelationshipType);
    }
  }, [member]);

  const handleCheckboxChange = (event, memberID) => {
    if (event.target.checked) {
      setSelectedMembers(prev => [...prev, memberID]);
    } else {
      setSelectedMembers(prev => prev.filter(id => id !== memberID));
    }
  };

  const handleRelationshipTypeChange = (memberID, type) => {
    setRelationshipType(prevTypes => ({
      ...prevTypes,
      [memberID]: type
    }));
  };

  const handleAddRelationships = () => {
    const updatedMember = {
      ...member,
      relationships: selectedMembers.map(memberID => ({
        memberID,
        type: relationshipType[memberID] || 'Unknown'
      }))
    };
    updateMember(updatedMember);
    setUpdatedMember(updatedMember);
  };

  // Filter out the current member from the members list
  const filteredMembers = members.filter(m => m.memberID !== member.memberID);

  return (
    <div className='memberDetailsForm'>
      <form className='all-form'>
        <h2>Add Relationships</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Select</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Relationship Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(member => (
              <tr key={member.memberID}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.memberID)}
                    onChange={(e) => handleCheckboxChange(e, member.memberID)}
                  />
                </td>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>
                  {selectedMembers.includes(member.memberID) && (
                    <select
                      value={relationshipType[member.memberID] || ''}
                      onChange={(e) => handleRelationshipTypeChange(member.memberID, e.target.value)}
                    >
                      <option value="">Select Relationship Type</option>
                      {relationshipTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary mt-3" onClick={handleAddRelationships}>Add Relationships</button>
      </form>
    </div>
  );
};

export default AddRelationship;
