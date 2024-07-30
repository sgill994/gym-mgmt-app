import React, { useState, useEffect } from 'react';

const AddRelationship = ({ members, member, updateMember }) => {
  const [checkedMembers, setCheckedMembers] = useState([]);

  useEffect(() => {
    if (member && Array.isArray(member.relationships)) {
      setCheckedMembers(member.relationships);
    }
  }, [member]);

  const handleCheckboxChange = (event, memberID) => {
    if (event.target.checked) {
      setCheckedMembers(prev => [...prev, memberID]);
    } else {
      setCheckedMembers(prev => prev.filter(id => id !== memberID));
    }
  };

  const handleSave = () => {
    const updatedMember = {
      ...member,
      relationships: checkedMembers
    };
    updateMember(updatedMember);
  };

  // Filter out the current member from the members list
  const filteredMembers = members.filter(m => m.memberID !== member.memberID);

  return (
    <div className='memberDetailsForm'>
      <form className='all-form'>
        <h3>Add Relationship</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Relationship</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(m => (
              <tr key={m.memberID}>
                <td>
                  <input
                    type="checkbox"
                    checked={checkedMembers.includes(m.memberID)}
                    onChange={(event) => handleCheckboxChange(event, m.memberID)}
                  />
                </td>
                <td>{m.firstName}</td>
                <td>{m.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleSave}>Save Relationships</button>
      </form>
    </div>
  );
};

export default AddRelationship;
