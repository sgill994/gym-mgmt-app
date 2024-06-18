import React from 'react';
import { Button } from 'react-bootstrap';

const ExportCSV = ({ members }) => {
  // Function to convert array of objects to CSV format
  const convertToCSV = (data) => {
    // Map data array to CSV format
    const csvArray = data.map(member => ({
      memberID: member.memberID,
      firstName: member.firstName,
      lastName: member.lastName,
      phoneNumber: member.phoneNumber,
      email: member.email,
      dateOfBirth: member.dateOfBirth,
      customerComments: member.customerComments,
      referralSource: member.referralSource,
      customCustomerID: member.customCustomerID,
      streetAddress: member.streetAddress,
      city: member.city,
      postalCode: member.postalCode,
      province: member.province,
      country: member.country,
      emergencyContactName: member.emergencyContactName,
      emergencyContactPhone: member.emergencyContactPhone,
      archived: member.archived ? 'Yes' : 'No', // Convert boolean to 'Yes' or 'No'
    }));

    // Define CSV headers
    const headers = [
      { label: 'Member ID', key: 'memberID' },
      { label: 'First Name', key: 'firstName' },
      { label: 'Last Name', key: 'lastName' },
      { label: 'Phone Number', key: 'phoneNumber' },
      { label: 'Email', key: 'email' },
      { label: 'Date of Birth', key: 'dateOfBirth' },
      { label: 'Customer Comments', key: 'customerComments' },
      { label: 'Referral Source', key: 'referralSource' },
      { label: 'Custom Customer ID', key: 'customCustomerID' },
      { label: 'Street Address', key: 'streetAddress' },
      { label: 'City', key: 'city' },
      { label: 'Postal Code', key: 'postalCode' },
      { label: 'Province', key: 'province' },
      { label: 'Country', key: 'country' },
      { label: 'Emergency Contact Name', key: 'emergencyContactName' },
      { label: 'Emergency Contact Phone', key: 'emergencyContactPhone' },
      { label: 'Archived', key: 'archived' },
    ];

    // Create CSV content
    const csvContent =
      headers.map(header => header.label).join(',') + '\n' + // CSV header row
      csvArray.map(item => headers.map(header => item[header.key]).join(',')).join('\n'); // CSV data rows

    // Create blob with CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create URL for the blob
    const url = URL.createObjectURL(blob);

    // Create link element to trigger download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'members.csv');

    // Append link to body, trigger click to download, and remove link from body
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handler function for exporting CSV
  const handleExportCSV = () => {
    convertToCSV(members);
  };

  return (
    <div>
      {/* Export button */}
      <Button variant="primary" onClick={handleExportCSV}>
        Export
      </Button>
    </div>
  );
};

export default ExportCSV;
