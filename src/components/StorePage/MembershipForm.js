import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const conversionTypes = ['Upgrade', 'Downgrade', 'Equal Value'];

// (1) TO DO: Upload Image 

// (2) paymentStartOption -> on a specific day of month shows another dropdown for day to be set as start of billing cycle(done)

// (3) clientPayAmount line changes dynamically based on paymentStartOption selected (2)(done)

// (4) Summary changes dynamically based on paymentAmount and taxes or no taxes option (calculated and displayed)(done)

// (5) Auto-Convert (after expiration) should be a mapped dropdown of existing memberships options(done)

// (6) Conversion type only has 3 - can be hardcoded(need to ask sav about this am unsure)(done)

// (7) Purchase Restrictions section(continue this)
// (7.1) Add Available to all clients vs. introductory offer for new clients only vs. available to selected client types only 
// (7.1) Selected Client Types Only shows dropdowns (see website) Client Types can be hardcoded
// (7.2) Need to see if 'Client Groups' are created anywhere else on App, hardcode few opts for testing

// (8) Delete Access to Events (feature not used by staff)(done)

// (9) Membership Attendance Restriction (apply) shows additional information (4 sub options)
// (9.1) Enable Session Rollover has additional 4 sub options
// (9.2) ASK ALVIN: DO SESSIONS ROLLOVER? DO UNPAID SESSIONS GET RECONCILED WHEN ATTENDENCE RESETS NEXT MONTH/WEEK?

// (10) Membership Hold Rules have wrong options (should be allowed to hold, not allowed to hold)(done)
// (10.1) Move Membership Hold Rules (current) to Membership Hold BEHAVIOR (only appears whne membership CAN be put on hold)(done)

// (11) Charge cancellation fee shows box for $ amount for cancellation(done)
//  bug: clientPaymentAmount input should not change regardless if taxed or not

// (12) Delete Barcode - will be only for MERCH(done)

const MembershipForm = ({ show, handleClose, addMembership, existingMemberships }) => {
  const [formData, setFormData] = useState({
    membershipID: uuidv4(),
    membershipName: '',
    description: '',
    membershipDuration: '',
    durationUnit: 'months',
    autoPaymentEvery: '',
    paymentStartOption: 'saleDate',
    specificDay: '',
    clientPaymentAmount: '',
    taxes: 'doNotCharge',
    expirationAction: 'doNothing',
    convertTo: '',
    clientControl: true,
    storeCategory: '',
    priority: 'Medium',
    accessToClasses: 'All',
    attendanceRestriction: 'noRestriction',
    contract: 'noContract',
    memberType: 'Active Member',
    sharingMembership: 'share',
    membershipHoldRules: 'canHold',
    payrollCalculation: 'include',
    cancellationFee: 'noFee',
    receipt: 'default',
    revenueCategory: '',
    originalAmount: '' // To store the original amount before taxes
  });

  const [summaryText, setSummaryText] = useState('starting on the sale date');

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let updatedValue = value;

    // Update clientControl as boolean
    if (name === 'clientControl') {
      updatedValue = value === 'true';
    }

    setFormData((prevData) => {
      let newFormData = { ...prevData, [name]: updatedValue };
  
      // Handle paymentStartOption logic for updating summary text
      if (name === 'paymentStartOption') {
        let newSummaryText = '';
        switch (value) {
          case '1st':
            newSummaryText = 'every month(s) on the 1st';
            break;
          case '15th':
            newSummaryText = 'every month(s) on the 15th';
            break;
          case 'lastDay':
            newSummaryText = 'every month(s) on the last day of the month';
            break;
          case 'specificDay':
            newSummaryText = `every month(s) on the ${prevData.specificDay}`;
            break;
          default:
            newSummaryText = 'starting on the sale date';
        }
        setSummaryText(newSummaryText);
      }
  
      // Handle summary text update for specificDay when it's selected
      if (name === 'specificDay' && prevData.paymentStartOption === 'specificDay') {
        setSummaryText(`every month(s) on the ${value}`);
      }

      // Update the original amount if clientPaymentAmount changes
      if (name === 'clientPaymentAmount') {
        const originalAmount = parseFloat(value);
        newFormData = { ...newFormData, originalAmount: isNaN(originalAmount) ? '' : originalAmount };
      }
  
      // Handle taxes logic
      if (name === 'taxes') {
        let clientPaymentAmountWithTax = formData.originalAmount;

        if (formData.originalAmount) {
          if (value === 'charge') {
            clientPaymentAmountWithTax = (formData.originalAmount * 1.05).toFixed(2);
          } else {
            clientPaymentAmountWithTax = formData.originalAmount.toFixed(2);
          }
        }

        newFormData = { ...newFormData, clientPaymentAmount: clientPaymentAmountWithTax };
      }
  
      return newFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMembership({ ...formData });
    handleClose();
  };

  useEffect(() => {
    console.log('Memberships payment:', formData.clientPaymentAmount);
  }, [formData.clientPaymentAmount]);


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
                    <label>Auto-payments every &nbsp;</label>
                    <input 
                      type="number" 
                      min="1" 
                      name="autoPaymentEvery"
                      value={formData.autoPaymentEvery}
                      onChange={handleChange}
                    />
                    &nbsp; Month(s) &nbsp;
                    <select 
                      name="paymentStartOption"
                      value={formData.paymentStartOption}
                      onChange={handleChange}
                    >
                      <option value="saleDate">starting on the sale date</option>
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
                    <label>Clients will pay &nbsp;</label>
                    <input 
                      type="number"
                      name="clientPaymentAmount"
                      value={formData.clientPaymentAmount}
                      onChange={handleChange}
                      min="1"
                    />
                    &nbsp; <label>{summaryText}</label>
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
                      <option value="doNotCharge">Do not charge tax</option>
                      <option value="charge">Charge taxes</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Summary: Client will make payment(s) of {formData.clientPaymentAmount} every month(s)</label>
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
                {formData.expirationAction === 'autoConvert' && (
                  <>
                    <tr>
                      <td>
                        <label>Convert To</label>
                        <select
                          name="convertTo"
                          value={formData.convertTo}
                          onChange={handleChange}
                        >
                          <option value="">Select a membership</option>
                          {existingMemberships.map((membership) => (
                            <option key={membership.id} value={membership.id}>
                              {membership.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                       <select>
                        <option>{conversionTypes[0]}</option>
                        <option>{conversionTypes[1]}</option>
                        <option>{conversionTypes[2]}</option>
                       </select>
                      </td>
                    </tr>
                  </>
                )}
                {formData.expirationAction === 'autoRenew' &&(
                  <tr>
                    <td>
                      <div className="client-control-options">
                        <div
                          className={`box ${formData.clientControl === true ? 'active' : ''}`}
                          onClick={() => handleChange({ target: { name: 'clientControl', value: true } })}
                        >
                          <span className={`text ${formData.clientControl === true ? 'active' : ''}`}>Enable</span>
                        </div>
                        <div
                          className={`box ${formData.clientControl === false ? 'active' : ''}`}
                          onClick={() => handleChange({ target: { name: 'clientControl', value: false} })}
                        >
                          <span className={`text ${formData.clientControl === false ? 'active' : ''}`}>Disable</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td>
                    <label>Store Category</label>
                    <input 
                      type="text"  
                      name="storeCategory"
                      value={formData.storeCategory}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Purchase Restriction</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="client-control-options">
                      <div
                        className={`box ${formData.clientControl === true ? 'active' : ''}`}
                        onClick={() => handleChange({ target: { name: 'clientControl', value: true } })}
                      >
                        <span className={`text ${formData.clientControl === true ? 'active' : ''}`}>Enable</span>
                      </div>
                      <div
                        className={`box ${formData.clientControl === false ? 'active' : ''}`}
                        onClick={() => handleChange({ target: { name: 'clientControl', value: false} })}
                      >
                        <span className={`text ${formData.clientControl === false ? 'active' : ''}`}>Disable</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Priority</label>
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
                      <option value="Specific">Specific</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Attendance Restriction</label>
                    <select 
                      name="attendanceRestriction"
                      value={formData.attendanceRestriction}
                      onChange={handleChange}
                    >
                      <option value="noRestriction">No Restriction</option>
                      <option value="limited">Limited</option>
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
                      <option value="noContract">No Contract</option>
                      <option value="contract">Contract</option>
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
                      <option value="Active Member">Active Member</option>
                      <option value="Inactive Member">Inactive Member</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Sharing Membership</label>
                    <select 
                      name="sharingMembership"
                      value={formData.sharingMembership}
                      onChange={handleChange}
                    >
                      <option value="share">Share</option>
                      <option value="noShare">Do Not Share</option>
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
                      <option value="canHold">Membership can be put on hold</option>
                      <option value="canNotHold">Membership cannot be put on hold</option>
                    </select>
                  </td>
                </tr>
                {formData.membershipHoldRules === 'canHold' &&(
                  <tr>
                    <td>
                      <label>Membership Hold BEHAVIOR</label>
                      <select>
                        <option>Classic</option>
                        <option>Prorate</option>
                        <option>Continue Billing</option>
                      </select>
                      <label>Description</label>
                      <p>Classic: Membership payment is skipped and scheduled payments are moved to a new date based on the end of the hold period.</p>
                      <p>Prorate: Extends the length of a membership contract by the duration of the hold. Scheduled payment is prorated and is calculated based on the number of active days within the payment period.</p>
                      <p>Continue Billing: Extends the length of the membership contract by the duration of the hold period. Scheduled payments continue to be processed on their respective dates irrespective of the hold.</p>
                    </td>
                  </tr>
                )}
                <tr>
                  <td>
                    <label>Payroll Calculation</label>
                    <select 
                      name="payrollCalculation"
                      value={formData.payrollCalculation}
                      onChange={handleChange}
                    >
                      <option value="include">Include</option>
                      <option value="exclude">Exclude</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Cancellation Fee</label>
                    <select 
                      name="cancellationFee"
                      value={formData.cancellationFee}
                      onChange={handleChange}
                    >
                      <option value="noFee">No Fee</option>
                      <option value="fee">Fee</option>
                    </select>
                  </td>
                </tr>
                {formData.cancellationFee === 'fee' && (
                  <tr>
                    <td>
                    <input 
                      type="number" 
                      min="1" 
                      name="withFee"
                      value={formData.membershipDuration}
                      onChange={handleChange}
                    />
                    </td>
                  </tr>
                )}
                <tr>
                  <td>
                    <label>Receipt</label>
                    <select 
                      name="receipt"
                      value={formData.receipt}
                      onChange={handleChange}
                    >
                      <option value="default">Default</option>
                      <option value="custom">Custom</option>
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={handleClose}>
          Close
        </button>
        <button variant="primary" type="submit" form="newMembershipForm">
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default MembershipForm;