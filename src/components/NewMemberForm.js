import React, { useState, useEffect } from 'react';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import $ from 'jquery'; 
import { v4 as uuidv4 } from 'uuid';

const NewMemberForm = ({ addMember }) => {

  useEffect(() => {
    $('#datepicker').datepicker({
      format: 'mm/dd/yyyy', 
      autoclose: true
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
      const memberID = uuidv4();

      addMember({ firstName, lastName, phoneNumber, email, memberID });
      form.reset();
  
      // Reset validated state to false to turn off feedback
      setValidated(false);
    } 

    else {
      // If the form is invalid, set the validated state to true to display validation feedback
      setValidated(true);
      //<label htmlFor="validationCustom04" className="form-label">Email</label>
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
            <div className="invalid-feedback">Please add Last Name!</div>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom03" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="validationCustom03" placeholder="Phone Number" name="phoneNumber" required />
            <div className="invalid-feedback">Please add a valid phone number!</div>
        </div>
        <div class="mb-1">
            <div>Email</div>
            <input type="text" className="form-control" id="validationCustom04" placeholder="Email" name="email" required />
            <div className="invalid-feedback">Please add a valid email!</div>
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
            <input type="text" className="form-control" id="validationCustom07" placeholder="Referral Source" name="referralSource" />
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom08" className="form-label">Custom Customer ID</label>
            <input type="text" className="form-control" id="validationCustom08" placeholder="Custom Customer ID" name="customCustomerID" />
        </div>
      </div>

      <div className = 'customerAddress'>

      <legend>Address</legend>
        <div class="mb-3">
            <label htmlFor="validationCustom09" className="form-label">Street Adress</label>
            <input type="text" className="form-control" id="validationCustom09" placeholder="Street Adress" name="referralSource" required/>
        </div>
        <div class="row g-3">
          <div class="col-sm-7">
            <label htmlFor="validationCustom10" className="form-label">City</label>
            <input type="text" class="form-control" id="validationCustom10" placeholder="City" name='city' required/>
          </div>
          <div class="col-sm">
           <label htmlFor="validationCustom11" className="form-label">Zip/Postal Code</label>
            <input type="text" class="form-control" id="validationCustom11" placeholder="Zip/Postal Code"  required/>
          </div>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom12" className="form-label">State/Province</label>
            <input type="text" className="form-control" id="validationCustom12" placeholder="Province/Territory" name="province" required/>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom13" className="form-label">Country</label>
            <input type="text" className="form-control" id="validationCustom13" placeholder="Country" name="country" required/>
        </div>
      </div>

      <div className = 'customerEmergencyContact'>
      <legend>Emergency Contact</legend>
        <div class="mb-3">
            <label htmlFor="validationCustom14" className="form-label">Emergency Contact Name</label>
            <input type="text" className="form-control" id="validationCustom14" placeholder="Emergency Contact Name" name="emergencyContactName" required/>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom15" className="form-label">Emergency Contact Phone</label>
            <input type="text" className="form-control" id="validationCustom15" placeholder="Emergency Contact Phone" name="emergencyContactPhone" required/>
        </div>
      </div>

      <button className="btn btn-primary" type="submit">Submit form</button>
      
    </form>
  );
};

export default NewMemberForm;