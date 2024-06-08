// TableGenerator.js

function generateTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return ''; // Return an empty string if data is not valid
    }
  
    // Generate the table body
    const tableBody = data.map((item, index) => (
      `<tr key=${index}>
        <td>${item.memberID}</td>
        <td>${item.firstName}</td>
        <td>${item.lastName}</td>
        <td>${item.phoneNumber}</td>
        <td>${item.email}</td>
        <td>${item.dateOfBirth}</td>
        <td>${item.customerComments}</td>
        <td>${item.referralSource}</td>
        <td>${item.customCustomerID}</td>
        <td>${item.streetAddress}</td>
        <td>${item.city}</td>
        <td>${item.postalCode}</td>
        <td>${item.province}</td>
        <td>${item.country}</td>
        <td>${item.emergencyContactName}</td>
        <td>${item.emergencyContactPhone}</td>
      </tr>`
    )).join('');
  
    // Combine the header and body to create the complete table
    const table = `
      <table class="table">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Customer Comments</th>
            <th>Referral Source</th>
            <th>Custom Customer ID</th>
            <th>Street Address</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Province</th>
            <th>Country</th>
            <th>Emergency Contact Name</th>
            <th>Emergency Contact Phone</th>
          </tr>
        </thead>
        <tbody>
          ${tableBody}
        </tbody>
      </table>
    `;
  
    return table;
  }
  
  export default generateTable;
  