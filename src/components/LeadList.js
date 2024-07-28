import React, {useState} from 'react';
import { Table, Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import { FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';
import LeadDetails from '../components/LeadDetails';
import LeadComments from '../components/LeadComments';

const LeadList = ({leads, filteredLeads, setLeadStatus, deleteLead, updateLead, updateLeadHistory}) => {
    const [editingLeadID, setEditingLeadID] = useState(null);
    const [FUStatus, setFUStatus] = useState('Never Contacted');
    const [currentStatus, setCurrentStatus] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [editingLead, setLeadToEdit] = useState(null);
    const [commentModal, setCommentModal] = useState(false);
    const [commentLead, setCommentLead] = useState(null);
    
    // Allows user to edit lead's 'follow up status' with dropdown options
    const handleStatusEdit = (leadID, currentStatus) => {
        setEditingLeadID(leadID);
        setFUStatus(currentStatus);
        setCurrentStatus(currentStatus);
    };

    // Saves lead's 'follow up status' to selected option
    const handleSave = (leadID) => {
        setLeadStatus(leadID, FUStatus);
        setEditingLeadID(null);
    };

    // Updates lead's 'follow up status' to option selected from dropdown menu
    const handleStatusChange = (status) => {
        setFUStatus(status);
        setCurrentStatus(status);
    }

    // Sets 'Edit Modal' condition to true to open editing window
    const openEditModal = (lead) => {
        setLeadToEdit(lead);
        setEditModal(true);
    }

    // Sets 'Edit Modal' condition to false to hide editing window
    const closeEditModal = () => {
        setLeadToEdit(null);
        setEditModal(false);
    }

    // Opens delete confirmation window 
    const handleDelete = (lead) => {
        setLeadToDelete(lead);
        setDeleteModal(true);
    }

    // Sets 'Delete Modal' condition to false to hide delete confirmation window
    const cancelDelete = () => {
        setLeadToDelete(null);
        setDeleteModal(false);
    }

    // Deletes lead from leads list permanently
    const confirmDelete = () => {
        deleteLead(leadToDelete.leadID);
        setDeleteModal(false);
        setLeadToDelete(null);
    }

    // Sets 'Comment Modal' condition to true to open lead comments window
    const openCommentModal = (lead) => {
        const updatedLead = updateLeadHistory(lead, leads);
        updateLead(updatedLead, lead);
        console.log("State of lead passed to comment modal: ", lead);
        setCommentLead(updatedLead);
        setCommentModal(true);
    }

    // Sets 'Comment Modal' condition to false to hide lead comments window
    const closeCommentModal = () => {
        setCommentLead(null);
        setCommentModal(false);
    }

    return (
        <div>
            <Table striped bordered hover className="table-center">
                <thead>
                    <tr>
                        <th>History</th>
                        <th>Date</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Campaign</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLeads.map((lead, index) => (
                        <tr key={index}>
                            <td>
                                {lead.oldLeadID !== '' ? 
                                    <Button variant="primary" onClick={() => openCommentModal(lead)}><FaCheck /></Button> : <label></label>
                                }
                            </td>
                            <td>{new Date(lead.dateAdded).toLocaleDateString()}</td>
                            <td>
                                <Button variant="link" onClick={() => openCommentModal(lead)}>{lead.firstName}</Button>
                            </td>
                            <td>{lead.lastName}</td>
                            <td>{lead.phoneNumber}</td>
                            <td>{lead.email}</td>
                            <td>{lead.source}</td>
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
                                <Button variant="primary" onClick={() => openEditModal(lead)}><FaPencilAlt /></Button>
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

            <Modal show={editModal} onHide={closeEditModal}> 
                <Modal.Header closeButton>
                    <Modal.Title>Edit Lead Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LeadDetails lead={editingLead} updateLead={updateLead} closeEditModal={closeEditModal} />
                </Modal.Body>
            </Modal>

            <Modal show={commentModal} onHide={closeCommentModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Lead Interactions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LeadComments lead={commentLead} leads={leads} updateLead={updateLead} updateLeadHistory={updateLeadHistory} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LeadList;
