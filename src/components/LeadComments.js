import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {FaEdit, FaTrashAlt, FaSave, FaTimes} from 'react-icons/fa';

const LeadComments = ({lead, updateLead}) => {
    const [commentLead, setCommentLead] = useState(lead);
    const [newComment, setNewComment] = useState('');
    const [editingCommentIndex, setEditingCommentIndex] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState('');

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
        </div>
    );
};

export default LeadComments;

