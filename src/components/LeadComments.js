import React, {useState} from 'react';
import {Table, Form, Button, Modal} from 'react-bootstrap';
import {FaEdit, FaTrashAlt, FaSave, FaTimes} from 'react-icons/fa';

const LeadComments = ({lead, leads, updateLead, updateLeadHistory}) => {
    const [commentLead, setCommentLead] = useState(lead);
    const [newComment, setNewComment] = useState('');
    const [editingCommentIndex, setEditingCommentIndex] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState('');
    const [historicalCommentModal, setHistoricalCommentModal] = useState(false);
    const [historicalComments, setHistoricalComments] = useState([]);
    const [historicalTimestamps, setHistoricalTimestamps] = useState([]);

    const openHistoricalCommentModal = (comments, timestamps) => {
        setHistoricalComments(comments);
        setHistoricalTimestamps(timestamps);
        setHistoricalCommentModal(true);
    };

    const closeHistoricalCommentModal = () => {
        setHistoricalComments([]);
        setHistoricalTimestamps([]);
        setHistoricalCommentModal(false);
    };

    // Updates lead's comment list and timestamps on save for new and editted comments 
    // Sets lead object to point to updated copy
    const saveComment = () => {
        const timestamp = new Date().toLocaleString();
        let updatedComments;
        let updatedTimestamps;

        if (editingCommentIndex !== null) {
            // Editing an existing comment
            updatedComments = [...commentLead.comments];
            updatedTimestamps = [...commentLead.timestamps];
            updatedComments[editingCommentIndex] = editingCommentText;
            updatedTimestamps[editingCommentIndex] = timestamp;
            setEditingCommentIndex(null);
            setEditingCommentText('');
        } else {
            // Adding a new comment to empty comments list
            updatedComments = [newComment, ...commentLead.comments];
            updatedTimestamps = [timestamp, ...commentLead.timestamps]; 
            setNewComment('');
        }

        const updatedLead = { ...commentLead, comments: updatedComments, timestamps: updatedTimestamps };
        updateLead(updatedLead, commentLead);
        setCommentLead(updatedLead);
    };
    
    // Sets index and comment's text for comment to edit
    const editComment = (index) => {
        setEditingCommentIndex(index);
        setEditingCommentText(commentLead.comments[index]);
    };

    // Resets index and comment's text to NaN on cancel
    const cancelEdit = () => {
        setEditingCommentIndex(null);
        setEditingCommentText('');
    }

    // Removes comment at index passed from list 
    // Sets lead object to point to updated lead
    const deleteComment = (index) => {
        const updatedComments = commentLead.comments.filter((_, i) => i !== index);
        const updatedLead = {...commentLead, comments: updatedComments};
        updateLead(updatedLead, commentLead);
        setCommentLead(updatedLead);
    }

    return (
        <div data-comment="new comment text input">
            {commentLead?.leadHistory.length > 0 && (
                <div>
                    <h5>Related Leads</h5>
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
                            {commentLead?.leadHistory.map((relatedLead, index) => (
                                <tr key={index}>
                                    <td>
                                        <Button variant="link" onClick={() => openHistoricalCommentModal(relatedLead.comments, relatedLead.timestamps)}>
                                            {relatedLead.firstName}
                                        </Button>
                                    </td>
                                    <td>{relatedLead.lastName}</td>
                                    <td>{relatedLead.phoneNumber}</td>
                                    <td>{relatedLead.email}</td>
                                    <td>{relatedLead.followUpStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <h2>Follow-Ups with {commentLead?.firstName} {commentLead?.lastName}</h2>
            <Form>
                <Form.Group>
                    <Form.Label>New Comment</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows="3" 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={saveComment}>Save</Button>
            <hr />
            <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                {commentLead?.comments?.map((comment, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}> 
                        <div style={{ marginTop: '10px' }}>
                            {editingCommentIndex === index ? (
                                <div data-comment="selected commented is editable">
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={editingCommentText}
                                        onChange={(e) => setEditingCommentText(e.target.value)}
                                    />
                                    <Button variant="primary" onClick={saveComment}><FaSave /></Button>
                                    <Button variant="secondary" onClick={cancelEdit}><FaTimes /></Button>
                                </div>
                            ) : (
                                <div data-comment="read-only view for all comments">
                                    <p>{comment}</p>
                                    <small>{commentLead.timestamps[index]}</small>
                                    <Button variant="link" onClick={() => editComment(index)}><FaEdit /></Button>
                                    <Button variant="link" onClick={() => deleteComment(index)}><FaTrashAlt /></Button>
                                </div>
                            )}
                        </div>
                    </div>
                    ))}
            </div>
            <Modal show={historicalCommentModal} onHide={closeHistoricalCommentModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Historical Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {historicalComments.map((comment, index) => (
                            <li key={index}>
                                {comment} - <em>{new Date(historicalTimestamps[index]).toLocaleString()}</em>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHistoricalCommentModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LeadComments;

