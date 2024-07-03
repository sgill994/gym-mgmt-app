import React, {useState} from 'react';
import { Table, Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import { FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';
import LeadDetails from '../components/LeadDetails';

const LeadList = ({leads, setLeadStatus, deleteLead, updateLead}) => {
    const [editingLeadID, setEditingLeadID] = useState(null);
    const [FUStatus, setFUStatus] = useState('Never Contacted');
    const [currentStatus, setCurrentStatus] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [editingLead, setEditingLead] = useState(null);

    const handleStatusEdit = (leadID, currentStatus) => {
        setEditingLeadID(leadID);
        setFUStatus(currentStatus);
        setCurrentStatus(currentStatus);
    };

    const handleSave = (leadID) => {
        setLeadStatus(leadID, FUStatus);
        setEditingLeadID(null);
    };

    const handleStatusChange = (status) => {
        setFUStatus(status);
        setCurrentStatus(status);
    }

    const handleLeadEdit = (lead) => {
        setEditingLead(lead);
        setEditModal(true);
    }

    const closeLeadEdit = () => {
        setEditingLead(null);
        setEditModal(false);
    }

    const handleDelete = (lead) => {
        setLeadToDelete(lead);
        setDeleteModal(true);
    }

    const cancelDelete = () => {
        setLeadToDelete(null);
        setDeleteModal(false);
    }

    const confirmDelete = () => {
        deleteLead(leadToDelete.leadID);
        setDeleteModal(false);
        setLeadToDelete(null);
    }

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
                        <th>Actions</th>
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
                                    <DropdownButton id="dropdown-status-button" title={currentStatus}>
                                        <Dropdown.Item onClick={() => handleStatusChange('1st Follow Up')}>1st Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('2nd Follow Up')}>2nd Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('3rd Follow Up')}>3rd Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('4th Follow Up')}>4th Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('5th Follow Up')}>5th Follow Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('1st Trial Booked')}>1st Trial Booked</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('1st Trial Complete')}>1st Trial Complete</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('2nd Trial Booked')}>2nd Trial Booked</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('2nd Trial Complete')}>2nd Trial Complete</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('Signed - Bronze')}>Signed - Bronze</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('Signed - Silver')}>Signed - Silver</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('Signed - Gold')}>Signed - Gold</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('Declined')}>Declined</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange('Archived')}>Archived</Dropdown.Item>
                                    </DropdownButton>
                                    <Button variant="success" onClick={() => handleSave(lead.leadID)}><FaCheck /></Button>
                                    </>
                                ) : (
                                    <> 
                                        {lead.followUpStatus}
                                        <Button variant="primary" onClick={() => handleStatusEdit(lead.leadID, lead.followUpStatus)}><FaPencilAlt /></Button>
                                    </>
                                )}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(lead)}><FaTimes /></Button>
                                <Button variant="primary" onClick={() => handleLeadEdit(lead)}><FaPencilAlt /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={deleteModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Lead</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to permanently delete this lead?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editModal} onHide={closeLeadEdit}> 
                <Modal.Header closeButton>
                    <Modal.Title>Edit Lead Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LeadDetails lead={editingLead} updateLead={updateLead} closeLeadEdit={closeLeadEdit} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default LeadList;
