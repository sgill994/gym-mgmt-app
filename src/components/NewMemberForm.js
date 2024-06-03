import React from 'react';

const NewMemberForm = ({ addMember }) => (
  <form
    id="new-member-form"
    onSubmit={(e) => {
      e.preventDefault();
      const firstName = e.target['first-name'].value;
      const lastName = e.target['last-name'].value;
      const contactNumber = e.target['contact-number'].value;
      addMember({ firstName, lastName, contactNumber });
      e.target.reset();
    }}
  >
    <label htmlFor="first-name">First Name:</label>
    <input type="text" id="first-name" required /><br />
    <label htmlFor="last-name">Last Name:</label>
    <input type="text" id="last-name" required /><br />
    <label htmlFor="contact-number">Contact Number:</label>
    <input type="text" id="contact-number" required /><br />
    <button type="submit">Save</button>
  </form>
);

export default NewMemberForm;
