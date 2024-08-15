import React, { useState } from 'react';

const MembershipForm = () => {

  return (
    <form className="newMembershipForm">
      <div className='all-form'>
        <table className='table'>
          <tbody>
          <tr>
            <td>
              <label>Class/Events Membership Name</label>
              <input 
                  type="text" 
                  placeholder="CLASS/EVENTS MEMBERSHIP NAME" 
                />
            </td>
          </tr>
          <tr>
            <td>
            <label>Description</label>
            <textarea 
            />
            </td>
          </tr>
          <tr>
            <td>
              <label>Membership Duration</label>
              <input 
                type="number" 
                min="1" 
              />
            <select >
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
              />
              <select >
                <option value="">starting on the sale date </option>
                <option value="">starting on the 1st of the month </option>
                <option value="">starting on the 15th of the month</option>
                <option value="">starting the last day of the month</option>
                <option value="">on a specific day of the month</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Clients will pay 
              <input 
                type="text" 
              />
               every month(s) on the 1st</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>Taxes</label>
              <select >
                <option value="charge">Charge taxes</option>
                <option value="doNotCharge">Do not charge tax</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>After Expiration</label>
              <select>
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
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Store Category</label>
              <input 
                type="text" 
              />
              <button type="button">Add Category</button>
            </td>
          </tr>
          <tr>
            <td>
              <label>Purchase Option Priority</label>
              <select>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Access to Classes</label>
              <select >
                <option value="All">All</option>
                <option value="None">None</option>
                <option value="Selection">Selection</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Access to Events</label>
              <select>
                <option value="All">All</option>
                <option value="None">None</option>
                <option value="Selection">Selection</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Membership Attendance Restrictions</label>
              <select>
                <option value="noRestriction">No attendance restriction</option>
                <option value="applyRestriction">Apply attendance restriction</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Contract</label>
              <select>
                <option value="noContract">No contract</option>
                <option value="clientContract">Clients must agree to a contract</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Member Type</label>
              <select>
                <option value="Active Member">Active Member</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Sharing Memberships and Passes</label>
              <select >
                <option value="share">Share membership with family members by default</option>
                <option value="doNotShare">Do not share membership with family members by default</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Membership Hold Rules</label>
              <select >
                <option value="classic">Classic</option>
                <option value="prorate">Prorate</option>
                <option value="continueBilling">Continue Billing</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Revenue and Staff Payroll Calculation</label>
              <select>
                <option value="include">Include clients who use this Purchase Option in payroll calculation</option>
                <option value="exclude">Exclude clients who use this Purchase Option from payroll calculation</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Membership Cancellation Fee</label>
              <select>
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
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Receipt</label>
              <select>
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
              />
              <button type="button">Add</button>
              <p>There are no existing categories.</p>
            </td>
          </tr>
          </tbody>
        </table>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="reset">Reset</button>
      </div>
    </div>
  </form>
);
};

export default MembershipForm;
