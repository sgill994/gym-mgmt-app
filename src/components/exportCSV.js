import React from 'react';
import { Button } from 'react-bootstrap';

const ExportCSV = ({ members }) => {
  const convertToCSV = (data) => {
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
      archived: member.archived ? 'Yes' : 'No',
    }));

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

    const csvContent =
      headers.map(header => header.label).join(',') + '\n' +
      csvArray.map(item => headers.map(header => item[header.key]).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'members.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCSV = () => {
    convertToCSV(members);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleExportCSV}>
        Export
      </Button>
    </div>
  );
};

export default ExportCSV;
