import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
// TO DO: Upload Image 

// paymentStartOption -> on a specific day of month shows another dropdown for day to be clientPayAmount line changes dynamically based on 
// paymentStartOption selected
// Summary changes dynamically based on paymentAmount
// and taxes or no taxes option (calculated and displayed)
// Convert To should be a mapped dropdown from memberships array 
// of existing membership options
// Conversion type only has 3 - can be hardcoded
// Delete Purchase Option Priority field 
// Add Available to all clients vs. introductory offer for new clients only vs. available to selected client types only 
// Selected Client Types Only shows dropdowns (see website)
// Delete Access to Events 
// Membership Attendance Restriction (apply) shows additional information
// ASK ALVIN: DO SESSIONS ROLLOVER? DO UNPAID SESSIONS GET RECONCILED WHEN ATTENDENCE RESETS NEXT MONTH/WEEK?
// Membership Hold Rules have wrong options (should be allowed to hold, not allowed to hold)
// Move Membership Hold Rules (current) to Membership Hold BEHAVIOR (only appears whne membership CAN be put on hold)
// Delete Barcode - will be only for MERCH 
/*
ajshdgfj
asldkfjas;df
k;asjdhf
*/
const MembershipForm = ({ show, handleClose, addMembership }) => {
  const [formData, setFormData] = useState({
    membershipName: '',
    description: '',
    membershipDuration: 1,
    durationUnit: 'months',
    autoPaymentEvery: 1,
    paymentStartOption: '',
    specificDay: '', 
    clientPaymentAmount: '',
    taxes: 'charge',
    expirationAction: 'doNothing',
    convertTo: '',
    storeCategory: '',
    priority: 'Medium',
    accessToClasses: 'All',
    accessToEvents: 'All',
    attendanceRestriction: 'noRestriction',
    contract: 'noContract',
    memberType: 'Active Member',
    sharingMembership: 'share',
    membershipHoldRules: 'classic',
    payrollCalculation: 'include',
    cancellationFee: 'noFee',
    barcode: '',
    receipt: 'default',
    revenueCategory: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMembership(formData);  // Add the form data to the memberships list
    handleClose();  // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>New Membership Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="newMembershipForm" onSubmit={handleSubmit}>
          <div className='all-form'>
            <table className='table'>
              <tbody>
                <tr>
                  <td>
                    <label>Class/Events Membership Name</label>
                    <input 
                      type="text" 
                      placeholder="CLASS/EVENTS MEMBERSHIP NAME" 
                      name="membershipName"
                      value={formData.membershipName}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Description</label>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Membership Duration</label>
                    <input 
                      type="number" 
                      min="1" 
                      name="membershipDuration"
                      value={formData.membershipDuration}
                      onChange={handleChange}
                    />
                    <select 
                      name="durationUnit"
                      value={formData.durationUnit}
                      onChange={handleChange}
                    >
                      <option value="months">Month(s)</option>
                      <option value="years">Year(s)</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Auto-payments every </label>
                    <input 
                      type="number" 
                      min="1" 
                      name="autoPaymentEvery"
                      value={formData.autoPaymentEvery}
                      onChange={handleChange}
                    />
                    <select 
                      name="paymentStartOption"
                      value={formData.paymentStartOption}
                      onChange={handleChange}
                    >
                      <option value="">starting on the sale date</option>
                      <option value="1st">starting on the 1st of the month</option>
                      <option value="15th">starting on the 15th of the month</option>
                      <option value="lastDay">starting the last day of the month</option>
                      <option value="specificDay">on a specific day of the month</option>
                    </select>
                     {formData.paymentStartOption === 'specificDay' && (
                      <input
                        type="number"
                        name="specificDay"
                        min="1"
                        max="31"
                        placeholder="Day of month"
                        value={formData.specificDay}
                        onChange={handleChange}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Clients will pay</label>
                    <input 
                      type="text" 
                      name="clientPaymentAmount"
                      value={formData.clientPaymentAmount}
                      onChange={handleChange}
                    />
                    <label>every month(s) on the 1st</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Taxes</label>
                    <select 
                      name="taxes"
                      value={formData.taxes}
                      onChange={handleChange}
                    >
                      <option value="charge">Charge taxes</option>
                      <option value="doNotCharge">Do not charge tax</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>After Expiration</label>
                    <select 
                      name="expirationAction"
                      value={formData.expirationAction}
                      onChange={handleChange}
                    >
                      <option value="doNothing">Do nothing</option>
                      <option value="autoRenew">Auto-renew</option>
                      <option value="autoConvert">Auto-convert</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>CONVERT TO</label>
                    <input 
                      type="text"  
                      name="convertTo"
                      value={formData.convertTo}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Store Category</label>
                    <input 
                      type="text" 
                      name="storeCategory"
                      value={formData.storeCategory}
                      onChange={handleChange}
                    />
                    <button type="button">Add Category</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Purchase Option Priority</label>
                    <select 
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Access to Classes</label>
                    <select 
                      name="accessToClasses"
                      value={formData.accessToClasses}
                      onChange={handleChange}
                    >
                      <option value="All">All</option>
                      <option value="None">None</option>
                      <option value="Selection">Selection</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Access to Events</label>
                    <select 
                      name="accessToEvents"
                      value={formData.accessToEvents}
                      onChange={handleChange}
                    >
                      <option value="All">All</option>
                      <option value="None">None</option>
                      <option value="Selection">Selection</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Membership Attendance Restrictions</label>
                    <select 
                      name="attendanceRestriction"
                      value={formData.attendanceRestriction}
                      onChange={handleChange}
                    >
                      <option value="noRestriction">No attendance restriction</option>
                      <option value="applyRestriction">Apply attendance restriction</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Contract</label>
                    <select 
                      name="contract"
                      value={formData.contract}
                      onChange={handleChange}
                    >
                      <option value="noContract">No contract</option>
                      <option value="clientContract">Clients must agree to a contract</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Member Type</label>
                    <select 
                      name="memberType"
                      value={formData.memberType}
                      onChange={handleChange}
                    >
                      <option value="activeMember">Active Member</option>
                      <option value="inactiveMember">Inactive Member</option>
                      <option value="prospect">Prospect</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Sharing Memberships and Passes</label>
                    <select 
                      name="sharingMembership"
                      value={formData.sharingMembership}
                      onChange={handleChange}
                    >
                      <option value="share">Share membership with family members by default</option>
                      <option value="doNotShare">Do not share membership with family members by default</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Membership Hold Rules</label>
                    <select 
                      name="membershipHoldRules"
                      value={formData.membershipHoldRules}
                      onChange={handleChange}
                    >
                      <option value="classic">Classic</option>
                      <option value="prorate">Prorate</option>
                      <option value="continueBilling">Continue Billing</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Revenue and Staff Payroll Calculation</label>
                    <select 
                      name="payrollCalculation"
                      value={formData.payrollCalculation}
                      onChange={handleChange}
                    >
                      <option value="include">Include clients who use this Purchase Option in payroll calculation</option>
                      <option value="exclude">Exclude clients who use this Purchase Option from payroll calculation</option>
                    </select>
                    </td>
                </tr>
                <tr>
                  <td>
                    <label>Membership Cancellation Fee</label>
                    <select 
                      name="cancellationFee"
                      value={formData.cancellationFee}
                      onChange={handleChange}
                    >
                      <option value="noFee">Don't charge a cancellation fee</option>
                      <option value="chargeFee">Charge a cancellation fee</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Barcode</label>
                    <input
                      type="text"
                      name="barcode"
                      value={formData.barcode}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Receipt</label>
                    <select 
                      name="receipt"
                      value={formData.receipt}
                      onChange={handleChange}
                    >
                      <option value="default">Default email receipt</option>
                      <option value="custom">Custom email receipt</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Revenue Category</label>
                    <input
                      type="text"
                      name="revenueCategory"
                      value={formData.revenueCategory}
                      onChange={handleChange}
                    />
                    <button type="button">Add</button>
                    <p>There are no existing categories.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="reset" className="btn btn-secondary">Reset</button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
        <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
      </Modal.Footer>
    </Modal>
  );
};

export default MembershipForm;

