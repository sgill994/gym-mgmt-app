import React, {useState} from 'react';
import { Table, Button, DropdownButton, Dropdown } from 'react-bootstrap';

const LeadList = ({leads, setLeadStatus}) => {
    const [editingLeadID, setEditingLeadID] = useState(null);
    const [FUStatus, setFUStatus] = useState('Never Contacted');

    const handleEdit = (leadID, currentStatus) => {
        setEditingLeadID(leadID);
        setFUStatus(currentStatus);
    };

    const handleSave = (leadID) => {
        setLeadStatus(leadID, FUStatus);
        setEditingLeadID(null);
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead, index) => (
                        <tr key={index}>
                            <td>{lead.firstName}</td>
                            <td>{lead.lastName}</td>
                            <td>{lead.phoneNumber}</td>
                            <td>{lead.email}</td>
                            <td>
                                {editingLeadID === lead.leadID ? (
                                    <>
                                    <DropdownButton id="dropdown-status-button" title={lead.followUpStatus}>
                                        <Dropdown.Item onClick={() => setFUStatus('1st Follow Up')}>1st Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('2nd Follow Up')}>2nd Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('3rd Follow Up')}>3rd Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('4th Follow Up')}>4th Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('5th Follow Up')}>5th Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('1st Trial Booked')}>1st Trial Booked</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('1st Trial Complete')}>1st Trial Complete</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('2nd Trial Booked')}>2nd Trial Booked</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('2nd Trial Complete')}>2nd Trial Complete</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('Signed - Bronze')}>Signed - Bronze</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('Signed - Silver')}>Signed - Silver</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('Signed - Gold')}>Signed - Gold</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('Declined')}>Declined</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFUStatus('Archived')}>Archived</Dropdown.Item>
                                    </DropdownButton>
                                    <Button variant="success" onClick={() => handleSave(lead.leadID)}>Save</Button>
                                    </>
                                ) : (
                                    <> 
                                        {lead.followUpStatus}
                                        <Button variant="primary" onClick={() => handleEdit(lead.leadID, lead.followUpStatus)}>Edit</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default LeadList;
