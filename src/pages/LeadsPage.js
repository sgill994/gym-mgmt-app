import React, {useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import NewLeadForm from '../components/NewLeadForm';
import LeadList from '../components/LeadList';

const LeadsPage = ({members, leads, addLead, setLeadStatus}) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div id="manage-leads" className="tab active">
            <h3>Manage Leads</h3><br />
            <Button variant="primary" onClick={handleOpen}>Create New Lead</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Lead</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewLeadForm  members={members} leads={leads} addLead={(lead) => {addLead(lead); handleClose();}} />
                </Modal.Body>
            </Modal>
            <h3>Active Leads</h3>
            <LeadList leads={leads} setLeadStatus={setLeadStatus} />
        </div>
    );
}

export default LeadsPage;