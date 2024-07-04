import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';

const LeadComments = ({lead, updateLead}) => {
    const [commentLead, setCommentLead] = useState(lead);
    const [newComment, setNewComment] = useState('');
    const [editingCommentIndex, setEditingCommentIndex] = useState(null);

    const saveComment = () => {
        let updatedComments;
        if (editingCommentIndex !== null) {
            const updatedComments = [...commentLead.comments];
            updatedComments[editingCommentIndex] = newComment;
            setEditingCommentIndex(null);
        } else {
            updatedComments = [newComment, ...commentLead.comments];
        }

        const updatedLead = {...commentLead, comments: updatedComments};
        updateLead(updatedLead, commentLead);
        setCommentLead(updatedLead);
        setNewComment('');
    }
    
    const editComment = (index) => {
        setNewComment(commentLead.comments[index]);
        setEditingCommentIndex(index);
    }

    const deleteComment = (index) => {
        const updatedComments = commentLead.comments.filter((_, i) => i !== index);
        const updatedLead = {...commentLead, comments: updatedComments};
        updateLead(updatedLead, commentLead);
        setEditingCommentIndex(null);
    }

    return (
        <div>
            <h2>Follow-Ups with {commentLead?.firstName} {commentLead?.lastName}</h2>
            <Form>
                <Form.Group>
                    <Form.Label>New Comment</Form.Label>
                    <Form.Control as="textarea" rows="3" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={saveComment}>Save</Button>
            <hr />
            {commentLead?.comments?.map((comment, index) => (
                <div key={index}>
                    <p>{comment}</p> 
                    <div>
                        <Button variant="link" onClick={() => editComment(index)}><FaEdit /></Button>
                        <Button variant="link" onClick={() => deleteComment(index)}><FaTrashAlt /></Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeadComments;

