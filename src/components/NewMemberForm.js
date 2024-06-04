import React, { useState } from 'react';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';

const NewMemberForm = ({ addMember }) => {

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

    useEffect(() => {
      $('#datepicker').datepicker({
        format: 'mm/dd/yyyy', // specify your desired format
        autoclose: true
        // Other options you might need...
      });
    }, []);

  };
  
  return (
    <form className={`row g-3 ${validated ? 'was-validated' : ''}`} onSubmit={handleSubmit} noValidate >
          
      <div className = 'customerWelcome'>
      <legend>We are welcoming..</legend>
          <label htmlFor="validationCustom01" className="form-label">First name</label>
          <input type="text" className="form-control" id="validationCustom01" placeholder="First Name" name="firstName" required />
          <div className="invalid-feedback">Please add First Name!</div>
        <br/>
          <label htmlFor="validationCustom02" className="form-label">Last name</label>
          <input type="text" className="form-control" id="validationCustom02" placeholder="Last Name" name="lastName" required />
          <div className="invalid-feedback">Looks good!</div>
        <br />
          <label htmlFor="validationCustom03" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="validationCustom03" placeholder="Phone Number" name="phoneNumber" required />
          <div className="invalid-feedback">Looks good!</div>
        <br />
          <label htmlFor="validationCustom03" className="form-label">Email</label>
          <input type="text" className="form-control" id="validationCustom04" placeholder="Email" name="email" required />
          <div className="invalid-feedback">Looks good!</div>
       <br/>
          <input  type="checkbox" value="notSub" id="flexCheckDefault"/>
          <label for="flexCheckDefault">
            Mark as unsubscibed
          </label>
      </div>

      <div className = 'customerAdditionalInfo'>
      <legend>Additonal Info</legend>

        <label htmlFor="validationCustom03" className="form-label">Customer Notes</label>
        <br/>
        <textarea className="form-control" placeholder="Leave a comment here" style={{width:'100%'}} name="customerComments"></textarea>
        <br/>
        <div class="input-group date" data-provide="datepicker">
          <input type="text" class="form-control"/>
          <div class="input-group-addon">
              <span class="glyphicon glyphicon-th"></span>
          </div>
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
