import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Table } from 'react-bootstrap'
import ClassDetails from '../components/ClassDetails';
import NewClassForm from '../components/NewClassForm';

const ManageClassesPage = ({ classes, addClass }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const openClassDetails = (course) => {
        const newWindow = window.open('', '', 'width=600,height=400');
        newWindow.document.write('<html><head><title>Class Details</title></head><body>')
        newWindow.document.write('<div id="root"></div>');
        newWindow.document.write('</body></html>');
        newWindow.document.close();

        newWindow.addEventListener('DOMContentLoaded', () => {
            const root = createRoot(newWindow.document.getElementById('course-name'))
            root.render(<ClassDetails course={course} />);
        });
    };
    
    return (
        <div id="manage-classes" className="tab active">
            <h1>Manage Classes</h1><br />
            <Button variant="primary" onClick={handleOpen}>Add New Class</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Add New Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewClassForm addClass={(course) => { addClass(course); handleClose();}} />
                </Modal.Body>
            </Modal>
            <h2>Active Classes</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Weekly Classes</th>
                    <th>Start Time</th>
                    <th>Length</th>
                    <th>Class Limit</th>
                    <th>Instructor</th>
                </tr>
                </thead>
                <tbody>
                {classes.map((course, index) => (
                    <tr key={index}>
                    <td>
                        <a href="#" style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => openClassDetails(course)}>
                            {course.title}</a>
                    </td>
                    <td>{course.days.split(', ').length}</td> 
                    <td>{course.time}</td>
                    <td>{course.length}</td>
                    <td>{course.reservationLimit ? course.reservationLimit : 'No limit'}</td>
                    <td>{course.instructor}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ManageClassesPage;