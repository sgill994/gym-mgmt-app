import React, { useState } from 'react';
import ClassList from '../components/ClassList';
import NewClassForm from '../components/NewClassForm';
import { Modal, Button } from 'react-bootstrap'

const ManageClassesPage = ({ classes, addClass }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    
    return (
        <div id="manage-classes" className="tab active">
            <h1>Manage Classes</h1>
            <Button variant="primary" onClick={handleOpen}>Add New Class</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Add New Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewClassForm addClass={(course) => { addClass(course); handleClose();}} />
                </Modal.Body>
            </Modal>
            <ClassList classes={classes} />
        </div>
    );
}

export default ManageClassesPage;