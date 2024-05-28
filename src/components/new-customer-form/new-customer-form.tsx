import './new-customer-form.css';
import React from 'react';

export interface NewCustomerFormProps {
    className?: string;
}

export const NewCustomerForm: React.FC<NewCustomerFormProps> = ({ className = '' }) => (
    <div className={className}>
<form>
<div>
<form><label>First name:</label><br /><input type="text" /><br /><label>Last name:</label><br /><input type="text" /><br /><br /></form>
</div>
<div name='hi' className="customerInfo">
<form><label>First name:</label><br /><input type="text" /><br /><label>Last name:</label><br /><input type="text" /><br /><br /></form>
</div>
<div className="additionalnfo">
<form><label>First name:</label><br /><input type="text" /><br /><label>Last name:</label><br /><input type="text" /><br /><br /></form>
</div></form></div>
);