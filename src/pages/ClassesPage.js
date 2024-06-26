import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import NewClassForm from '../components/NewClassForm';
import ClassList from '../components/ClassList';

const ClassesPage = ({ classes, addClass, updateClass, deleteClass }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div id="manage-classes" className="tab active">
            <h1>Manage Classes</h1><br />
            <Button variant="primary" onClick={handleOpen}>Add New Class</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewClassForm addClass={(course) => { addClass(course); handleClose();}} />
                </Modal.Body>
            </Modal>
            <h2>Active Classes</h2>
            <ClassList 
                classes={classes} 
                updateClass={updateClass}
                deleteClass={deleteClass}
            />
        </div>
    );
}

export default ClassesPage;