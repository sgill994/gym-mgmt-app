import React, { useState, useEffect } from 'react';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import $ from 'jquery'; 
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'; // Import PropTypes module

const NewMemberForm = ({ addMember }) => {

  NewMemberForm.propTypes = {
    addMember: PropTypes.func.isRequired, // Validate addMember prop
  };

  // State variable to track form validation status
  const [validated, setValidated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  };
  
  //function to handle phone validation
  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    // Remove non-digit characters from the input
    const formattedInput = input.replace(/\D/g, '');
    
    // Format the phone number with hyphens
    let formattedPhoneNumber = '';
    if (formattedInput.length > 3) {
      formattedPhoneNumber = formattedInput.slice(0, 3) + '-';
      if (formattedInput.length > 6) {
        formattedPhoneNumber += formattedInput.slice(3, 6) + '-';
        formattedPhoneNumber += formattedInput.slice(6, 10);
      } else {
        formattedPhoneNumber += formattedInput.slice(3, 10);
      }
    } else {
      formattedPhoneNumber = formattedInput;
    }

    // Update the state with the formatted phone number
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleEmergencyContactPhoneChange = (event) => {
    const input = event.target.value;
    // Remove non-digit characters from the input
    const formattedInput = input.replace(/\D/g, '');
    
    // Format the phone number with hyphens
    let formattedPhoneNumber = '';
    if (formattedInput.length > 3) {
      formattedPhoneNumber = formattedInput.slice(0, 3) + '-';
      if (formattedInput.length > 6) {
        formattedPhoneNumber += formattedInput.slice(3, 6) + '-';
        formattedPhoneNumber += formattedInput.slice(6, 10);
      } else {
        formattedPhoneNumber += formattedInput.slice(3, 10);
      }
    } else {
      formattedPhoneNumber = formattedInput;
    }
  
    // Update the state with the formatted phone number
    setEmergencyContactPhone(formattedPhoneNumber);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === true) {

      event.preventDefault();
      const form = event.currentTarget;

      // Store data
      const formData = new FormData(form);
      const memberID = uuidv4();
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const phoneNumber = formData.get('phoneNumber');
      const email = formData.get('email');
      const dateOfBirth = formData.get('dateOfBirth');
      const customerComments = formData.get('customerComments');
      const referralSource = formData.get('referralSource');
      const customCustomerID = formData.get('customCustomerID');
      const streetAddress = formData.get('streetAddress');
      const city = formData.get('city');
      const postalCode = formData.get('postalCode');
      const province = formData.get('province');
      const country = formData.get('country');
      const emergencyContactName = formData.get('emergencyContactName');
      const emergencyContactPhone = formData.get('emergencyContactPhone');

      // Store all info in addMembers
      addMember({
        memberID,
        firstName,
        lastName,
        phoneNumber,
        email,
        dateOfBirth,
        customerComments,
        referralSource,
        customCustomerID,
        streetAddress,
        city,
        postalCode,
        province,
        country,
        emergencyContactName,
        emergencyContactPhone,
        archived: false
      });

      // Reset form and validation status
      form.reset();
      setValidated(false);

      console.log(addMember);
    } else {
      // If the form is invalid, set the validated state to true to display validation feedback
      setValidated(true);
    }
  };
  
  // Create the date picker
  useEffect(() => {
    $('#datepicker').datepicker({
      format: 'mm/dd/yyyy', 
      autoclose: true
    });
  }, []);
  
  return (
    <form className={`row g-3 ${validated ? 'was-validated' : ''}`} onSubmit={handleSubmit} noValidate >
          
      <div className = 'customerWelcome'>
        <legend>We are welcoming..</legend>
        <div className="mb-3">
            <label htmlFor="validationCustom01" className="form-label">First name</label>
            <input type="text" className="form-control" id="validationCustom01" placeholder="First Name" name="firstName" required />
            <div className="invalid-feedback">Please add First Name!</div>
        </div>
        <div className="mb-1">
            <label htmlFor="validationCustom02" className="form-label">Last name</label>
            <input type="text" className="form-control" id="validationCustom02" placeholder="Last Name" name="lastName" required />
            <div className="invalid-feedback">Please add Last Name!</div>
        </div>
        <div className="mb-1">
            <label htmlFor="validationCustom03" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom03"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
            <div className="invalid-feedback">Please add a valid phone number!</div>
        </div>
        <div className="mb-1">
            <div>Email</div>
            <input 
                type="email" 
                className="form-control" 
                id="validationCustom04" 
                placeholder="Email" 
                name="email" 
                onChange={(e) => {
                  const isValid = isValidEmail(e.target.value);
                  e.target.setCustomValidity(isValid ? '' : 'Please enter a valid email address');
              }}
                required 
            />
            <div className="invalid-feedback">Please add a valid email!</div>
        </div>
        <div className="mb-1">
          <input  type="checkbox" value="notSub" id="flexCheckDefault"/>
          <label htmlFor="flexCheckDefault">
            Mark as unsubscibed
          </label>
        </div>
      </div>

      <div className = 'customerAdditionalInfo'>
        <legend>Additonal Info</legend>
        <div className="mb-3">
          <label htmlFor="validationCustom05" className="form-label">Customer Notes</label>
          <textarea className="form-control" placeholder="Leave a comment here" id="validationCustom05" name="customerComments"></textarea>
        </div>
        <div className="mb-1">
          <label htmlFor="validationCustom06" className="form-label">Date of Birth</label><br/>
          <div className="input-group date" data-provide="datepicker">
            <input type="text" className="form-control" id='validationCustom06' name="dateOfBirth"/>
            <div className="input-group-addon">
              <span className="glyphicon glyphicon-th"></span>
            </div>
          </div>
        </div>
        <div className="mb-1">
            <label htmlFor="validationCustom07" className="form-label">Referral Source</label>
            <input type="text" className="form-control" id="validationCustom07" placeholder="Referral Source" name="referralSource" />
        </div>
        <div className="mb-1">
            <label htmlFor="validationCustom08" className="form-label">Custom Customer ID</label>
            <input type="text" className="form-control" id="validationCustom08" placeholder="Custom Customer ID" name="customCustomerID" />
        </div>
      </div>

      <div className = 'customerAddress'>

      <legend>Address</legend>
        <div className="mb-3">
            <label htmlFor="validationCustom09" className="form-label">Street Adress</label>
            <input type="text" className="form-control" id="validationCustom09" placeholder="Street Adress" name="referralSource" required/>
            <div className="invalid-feedback">Please add a valid address!</div>
        </div>
        <div className="row g-3">
          <div className="col-sm-7">
            <label htmlFor="validationCustom10" className="form-label">City</label>
            <input type="text" class="form-control" id="validationCustom10" placeholder="City" name='city' required/>
            <div className="invalid-feedback">Please add a valid City!</div>
          </div>
          <div className="col-sm">
           <label htmlFor="validationCustom11" className="form-label">Zip/Postal Code</label>
            <input type="text" class="form-control" id="validationCustom11" placeholder="Zip/Postal Code"  required/>
            <div className="invalid-feedback">Please add a valid Zip/Postal Code!</div>
          </div>
        </div>
        <div className="mb-1">
            <label htmlFor="validationCustom12" className="form-label">State/Province</label>
            <input type="text" className="form-control" id="validationCustom12" placeholder="Province/Territory" name="province" required/>
            <div className="invalid-feedback">Please add a valid State/Province!</div>
        </div>
        <div className="mb-1">
            <label htmlFor="validationCustom13" className="form-label">Country</label>
            <input type="text" className="form-control" id="validationCustom13" placeholder="Country" name="country" required/>
            <div className="invalid-feedback">Please add a valid Country!</div>
        </div>
      </div>

      <div className = 'customerEmergencyContact'>
      <legend>Emergency Contact</legend>
        <div className="mb-3">
            <label htmlFor="validationCustom14" className="form-label">Emergency Contact Name</label>
            <input type="text" className="form-control" id="validationCustom14" placeholder="Emergency Contact Name" name="emergencyContactName" required/>
            <div className="invalid-feedback">Please add a Contact Name!</div>
        </div>
        <div class="mb-1">
            <label htmlFor="validationCustom15" className="form-label">Emergency Contact Phone</label>
            <input 
              type="text" 
              className="form-control" 
              id="validationCustom15" 
              placeholder="Emergency Contact Phone" 
              value={emergencyContactPhone}
              onChange={handleEmergencyContactPhoneChange}
              required 
            />
            <div className="invalid-feedback">Please add a Contact Phone Number!</div>
        </div>
      </div>

      <button className="btn btn-primary" type="submit">Submit form</button>
      
    </form>
  );
};

export default NewMemberForm;
