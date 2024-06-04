import React, { useState } from 'react';

const NewMemberForm = ({ addMember }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();

    } else {
      const formData = new FormData(form);
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const phoneNumber = formData.get('phoneNumber');
      // Add more fields as needed

      addMember({ firstName, lastName, phoneNumber });
      form.reset();
      setValidated(false);
    }
    setValidated(true);
  };

  return (
    <form className={`row g-3 ${validated ? 'was-validated' : ''}`} onSubmit={handleSubmit} noValidate>

      <div id = 'customerWelcome'>

        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">First name</label>
          <input type="text" className="form-control" id="validationCustom01" name="firstName" required />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <br/>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">Last name</label>
          <input type="text" className="form-control" id="validationCustom02" name="lastName" required />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <br />
        <div className="col-md-4">
          <label htmlFor="validationCustom03" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="validationCustom03" name="phoneNumber" required />
          <div className="valid-feedback">Looks good!</div>
          <br />
          <button className="btn btn-primary" type="submit">Submit form</button>
        </div>

      </div>
      <div id = 'customerAddress'>
        
      </div>
      <div id = 'customerAdditionalInfo'>
        
      </div>
      <div id = 'customerEmergencyContact'>

      </div>
      
    </form>
  );
};

export default NewMemberForm;
