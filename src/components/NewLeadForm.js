import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Table } from 'react-bootstrap';


const NewLeadForm = ({ addLead, members, leads }) => {
    const [addArchivedMember, setAddArchivedMember] = useState(false);
    const [addNewLead, setAddNewLead] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    
    const openArchivedMembers = () => {
        setAddArchivedMember(true);
        setAddNewLead(false);
    };
    
    const closeArchivedMember = () => {
        setAddArchivedMember(false);
    };

    const openNewLeadForm = () => {
        setAddNewLead(true);
        setAddArchivedMember(false);
    };

    const closeNewLeadForm = () => {
        setAddNewLead(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                followUpStatus: 'Never Contacted'
            });
            closeNewLeadForm();
            form.reset();
        }
        else {
            selectedMembers.forEach(member => {
                addLead({
                    leadID: member.memberID,
                    firstName: member.firstName,
                    lastName: member.lastName,
                    phoneNumber: member.phoneNumber,
                    email: member.email,
                    followUpStatus: 'Never Contacted'
                });
            });
            setSelectedMembers([]);
            closeArchivedMember();
        }
    };

    const handleCheckBoxChange = (member) => {
        setSelectedMembers(prevSelected =>
            prevSelected.includes(member)
            ? prevSelected.filter(m => m !== member)
            : [...prevSelected, member]
        ); 
    };

    const filteredMembers = members.filter(member =>
        member.archived && !leads.some(lead => lead.leadID === member.memberID)
    );

    return (
        <div>
        <form className="new-lead-form" onSubmit={handleSubmit}>
            <div className="new-lead-options">
                <button type="button" onClick={openArchivedMembers}>Add Existing Member</button>
                <button type="button" onClick={openNewLeadForm}>Add New Lead</button>
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
                                    <th>Select</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone Number</th>
                                    <th>Email Address:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMembers.map((member, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" onChange={() => handleCheckBoxChange(member)} />
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
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    );
};

export default NewLeadForm;
