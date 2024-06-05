import React, { useState, useEffect } from 'react';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import $ from 'jquery'; // Import jQuery

const NewMemberForm = ({ addMember }) => {

  useEffect(() => {
    $('#datepicker').datepicker({
      format: 'mm/dd/yyyy', // specify your desired format
      autoclose: true
      // Other options you might need...
    });
  }, []);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    if (form.checkValidity() === true) {
      const formData = new FormData(form);
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const phoneNumber = formData.get('phoneNumber');
      const email = formData.get('email');

      addMember({ firstName, lastName, phoneNumber, email });
      form.reset();
  
      // Reset validated state to false to turn off feedback
      setValidated(false);
    } 

    else {
      // If the form is invalid, set the validated state to true to display validation feedback
      setValidated(true);
    }

  };
  
  return (
    <form className={`row g-3 ${validated ? 'was-validated' : ''}`} onSubmit={handleSubmit} noValidate >
          
      <div className = 'customerWelcome'>
        <legend>We are welcoming..</legend>
        <div class="mb-3">
            <label htmlFor="validationCustom01" className="form-label">First name</label>
            <input type="text" className="form-control" id="validationCustom01" placeholder="First Name" name="firstName" required />
            <div className="invalid-feedback">Please add First Name!</div>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom02" className="form-label">Last name</label>
            <input type="text" className="form-control" id="validationCustom02" placeholder="Last Name" name="lastName" required />
            <div className="invalid-feedback">Looks good!</div>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom03" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="validationCustom03" placeholder="Phone Number" name="phoneNumber" required />
            <div className="invalid-feedback">Looks good!</div>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom04" className="form-label">Email</label>
            <input type="text" className="form-control" id="validationCustom04" placeholder="Email" name="email" required />
            <div className="invalid-feedback">Looks good!</div>
        </div>
        <div class="mb-1">
          <input  type="checkbox" value="notSub" id="flexCheckDefault"/>
          <label htmlFor="flexCheckDefault">
            Mark as unsubscibed
          </label>
        </div>
      </div>

      <div className = 'customerAdditionalInfo'>
        <legend>Additonal Info</legend>
        <div class="mb-3">
          <label htmlFor="validationCustom05" className="form-label">Customer Notes</label>
          <textarea className="form-control" placeholder="Leave a comment here" id="validationCustom05" name="customerComments"></textarea>
        </div>
        <div class="mb-1">
          <label htmlFor="validationCustom06" className="form-label">Date of Birth</label><br/>
          <div className="input-group date" data-provide="datepicker">
            <input type="text" className="form-control" id='validationCustom06' name="dateOfBirth"/>
            <div className="input-group-addon">
              <span className="glyphicon glyphicon-th"></span>
            </div>
          </div>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom07" className="form-label">Referral Source</label>
            <input type="text" className="form-control" id="validationCustom07" placeholder="Email" name="referralSource" />
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom08" className="form-label">Custom Customer ID</label>
            <input type="text" className="form-control" id="validationCustom08" placeholder="Email" name="customCustomerID" />
        </div>
      </div>

      <div className = 'customerAddress'>

        
      </div>

      <div className = 'customerEmergencyContact'>

      </div>

      <button className="btn btn-primary" type="submit">Submit form</button>
      
    </form>
  );
};

export default NewMemberForm;
