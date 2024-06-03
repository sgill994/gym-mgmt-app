import './new-customer-form.css';
import React from 'react';

export interface NewCustomerFormProps {
    className?: string;
}

export const NewCustomerForm: React.FC<NewCustomerFormProps> = ({ className = '' }) => (
    <div className={className}>
<form>
<div className="left">
<div className="customerInfo">
<h3>We are welcoming..</h3>
<label>First name:</label><br /><input type="text" /><br /><label>Last name:</label><br /><input type="text" /><br />
<label>Phone</label>
<br />
<input />
<br />
<label>Email:</label>
<br />
<input />
</div>
<div className="addressInfo">
<h3>Address </h3>
<label>Street Address:</label>
<br />
<input />
<br />
<div className="postalCity">
<div className="postalCode">
<label>Postal Code:</label>
<br />
<input /></div>
<div className="city">
<label>City:</label>
<br />
<input />
</div>
</div>
<br />
<label>Province: </label>
<br />
<input />
<br />
<label>Country: </label>
<br />
<input />
<br />
</div>
</div>
<div className="right">
<div className="additionalInfo">
<h3>Additional Infomation</h3>
<label>Customer Notes:</label><br /><input type="text" /><br /><label>DOB:</label><br /><input type="text" />
<br />
<label>Referal:</label>
<br />
<input type="text" />
<br />
<label>Custom Customer ID:</label>
<br />
<input type="text" /></div>
<div className="emergecyContact">
<h3>Emergency Contact</h3>
<label>Emergency Contact Name:</label><br /><input type="text" /><br />
<label>Emergency Contact Phone Number:</label><br /><input type="text" />
<br /></div>
</div>
<div className="bottomSubmit">
<input type="submit" value="Submit" />
</div></form></div>
);