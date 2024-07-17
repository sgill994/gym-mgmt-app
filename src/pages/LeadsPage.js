import React, {useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import NewLeadForm from '../components/NewLeadForm';
import LeadList from '../components/LeadList';
import LeadTabs from '../components/LeadTabs';


const LeadsPage = ({members, leads, addLead, deleteLead, setLeadStatus, updateLead, updateLeadList}) => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('active-leads');
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
                            <NewLeadForm  members={members} leads={leads} addLead={addLead} updateLeadList={updateLeadList} closeModal={handleClose} />
                        </Modal.Body>
                    </Modal>
            <LeadTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab == 'active-leads' &&  (
                <>
                    <h3>Active Leads</h3>
                    <LeadList 
                        leads={leads.filter(lead => !lead.archived && !lead.declined)} 
                        setLeadStatus={setLeadStatus}
                        deleteLead={deleteLead}
                        updateLead={updateLead}
                    />
                </>
            )}
            {activeTab === 'archived-leads' && (
                <>
                    <h3>Active Leads</h3>
                    <LeadList 
                        leads={leads.filter(lead => lead.archived || lead.declined)} 
                        setLeadStatus={setLeadStatus}
                        deleteLead={deleteLead}
                        updateLead={updateLead}
                    />
                </>
            )}
            
        </div>
    );
}

export default LeadsPage;