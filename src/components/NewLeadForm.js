import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Table } from 'react-bootstrap';


const NewLeadForm = ({ addLead, members, leads, updateLeadList, closeModal }) => {
    const [addArchivedMember, setAddArchivedMember] = useState(false);
    const [addArchivedLead, setAddArchivedLead] = useState(false);
    const [addNewLead, setAddNewLead] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [selectAllMembers, setSelectAllMembers] = useState(false);
    const [selectAllLeads, setSelectAllLeads] = useState(false);

    const openArchivedMembers = () => {
        setAddArchivedMember(true);
        setAddNewLead(false);
    };
    
    const closeArchivedMember = () => {
        setAddArchivedMember(false);
    };

    const openArchivedLeads = () => {
        setAddArchivedLead(true);
        setAddNewLead(false);
        setAddArchivedMember(false);
    }

    const closeArchivedLeads = () => {
        setAddArchivedLead(false);
    }

    const openNewLeadForm = () => {
        setAddNewLead(true);
        setAddArchivedMember(false);
        setAddArchivedLead(false);
    };

    const closeNewLeadForm = () => {
        setAddNewLead(false);
    };

    // Allows adding of archived Members; archived Members can only have 1 active Lead at a time to prevent accidental duplicates
    // Members will repopulate on archived Members list existing associated Lead has been archived, declined, or deleted
    const filteredMembers = members.filter(member =>
        member.archived && !leads.some(lead => lead.leadID === member.memberID && !lead.archived && !lead.declined) 
    );

    // Allows adding of archived Leads (created as a 'new' Lead)
    // Each archived Lead can be added exactly once to prevent accidental duplicates
    const filteredLeads = leads.filter(lead => (lead.archived || lead.declined) && !lead.fromArchivedLead);

    const handleSubmit = (e) => {
        e.preventDefault();
        const leadFromDate = new Date().toLocaleString();

        // Create a new Lead by entering contact details manually 
        if (addNewLead) {
            const form = e.currentTarget;
            const formData = new FormData(form);
    
            const leadID = uuidv4();
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const phoneNumber = formData.get('phoneNumber');
            const email = formData.get('email');
    
            addLead({
                leadID, 
                firstName,
                lastName,
                phoneNumber,
                email,
                followUpStatus: 'Never Contacted',
                comments: [],
                timestamps: [],
                editedComments: [],
                archived: false,
                declined: false,
                oldLeadID: '',
                leadHistory: [],
                addedFromArchived: false,
                source: 'to do',
                dateAdded: leadFromDate
            });

            closeNewLeadForm();
            form.reset();
        }
        // Create a new Lead from an existing archived Member
        else if (addArchivedMember) {
            const newLeads = selectedMembers.map(member => ({
                leadID: member.memberID,
                firstName: member.firstName,
                lastName: member.lastName,
                phoneNumber: member.phoneNumber,
                email: member.email,
                followUpStatus: 'Never Contacted',
                comments: [],
                timestamps: [],
                editedComments: [],
                archived: false,
                declined: false,
                oldLeadID: '',
                leadHistory: [],
                addedFromArchived: false,
                source: 'to do',
                dateAdded: leadFromDate
            }));

            addLead(newLeads);        
            setSelectedMembers([]);
            closeArchivedMember();
        } 
        // Create a new Lead from an existing archived Lead
        else if (addArchivedLead) {
            const newLeads = selectedLeads.map(lead => ({
            leadID: uuidv4(),
            firstName: lead.firstName,
            lastName: lead.lastName,
            phoneNumber: lead.phoneNumber,
            email: lead.email,
            followUpStatus: 'Never Contacted',
            comments: [],
            timestamps: [],
            editedComments: [],
            archived: false,
            declined: false,
            oldLeadID: lead.oldLeadID !== '' ? lead.oldLeadID : lead.leadID,
            leadHistory: [...lead.leadHistory, lead],
            addedFromArchived: false,
            source: 'to do',
            dateAdded: leadFromDate
            }));

            // Set 'fromArchivedLead' to True for all added archived Leads to remove them from archived Lead list
            const updatedOriginalLeads = leads.map(lead => 
                selectedLeads.some(selectedLead => selectedLead.leadID === lead.leadID) 
                ? { ...lead, fromArchivedLead: true } 
                : lead
            );

            updateLeadList(updatedOriginalLeads);
            addLead(newLeads);
            setSelectedLeads([]);
            closeArchivedLeads();
        }
        closeModal();
    };

    // Select/unselected all unchecked/checked checkboxes when first checkbox is click
    const handleSelectAllChange = (items, setSelectedItems, setSelectAll) => {
        if (selectAllLeads) {
          setSelectedItems([]);
        } else {
          setSelectedItems(items);
        }
        setSelectAll(prev => !prev);
    };

    // Add Lead or Member for associated checked checkbox to list of Leads to be created on submit
    const handleCheckBoxChange = (item, setSelectedItems) => {
        setSelectedItems(prevSelected =>
          prevSelected.includes(item)
            ? prevSelected.filter(i => i !== item)
            : [...prevSelected, item]
        );
    };

    return (
        <div>
            <form className="new-lead-form" onSubmit={handleSubmit}>
                <div className="new-lead-options">
                    <button type="button" onClick={openArchivedMembers}>Add Archived Member</button>
                    <button type="button" onClick={openNewLeadForm}>Add New Lead</button>
                    <button type="button" onClick={openArchivedLeads}>Add Archived Lead</button>
                </div>
                {addNewLead && (
                    <>
                        <div className="lead-form-group">
                            <label>First Name: </label>
                            <input type="text" name="firstName" className="lead-form-control" required /><br />
                            <label>Last Name: </label>
                            <input type="text" name="lastName" className="lead-form-control" required /><br />
                            <label>Phone Number: </label>
                            <input type="text" name="phoneNumber" className="lead-form-control" required /><br />
                            <label>Email Address:</label>
                            <input type="text" name="email" className="lead-form-control" required /><br />
                        </div>
                    </>
                )}
                {addArchivedMember && (
                    <>
                        <div>
                            <Table striped border hover>
                                <thead>
                                    <tr>
                                        <th>
                                            <input 
                                                type="checkbox" 
                                                checked={selectAllMembers} 
                                                onChange={() => handleSelectAllChange(filteredMembers, setSelectedMembers, setSelectAllMembers)}
                                            />
                                            Select
                                        </th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone Number</th>
                                        <th>Email Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.map((member, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedMembers.includes(member)} 
                                                    onChange={() => handleCheckBoxChange(member, setSelectedMembers)}
                                                />
                                            </td>
                                            <td>{member.firstName}</td>
                                            <td>{member.lastName}</td>
                                            <td>{member.phoneNumber}</td>
                                            <td>{member.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}
                {addArchivedLead && (
                    <>
                        <div>
                            <Table striped border hover>
                                <thead>
                                    <tr>
                                        <th>
                                            <input 
                                                type="checkbox" 
                                                checked={selectAllLeads} 
                                                onChange={() => handleSelectAllChange(filteredLeads, setSelectedLeads, setSelectAllLeads)}
                                            />
                                            Select
                                        </th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone Number</th>
                                        <th>Email Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.map((lead, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedLeads.includes(lead)} 
                                                    onChange={() => handleCheckBoxChange(lead, setSelectedLeads)}
                                                />
                                            </td>
                                            <td>{lead.firstName}</td>
                                            <td>{lead.lastName}</td>
                                            <td>{lead.phoneNumber}</td>
                                            <td>{lead.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default NewLeadForm;
