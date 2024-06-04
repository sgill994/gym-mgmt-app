import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Table } from 'react-bootstrap'
import NewClassForm from '../components/NewClassForm';
import ClassList from '../components/ClassList';

const ManageClassesPage = ({ classes, addClass }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
<<<<<<< Updated upstream
=======

    const openClassDetails = (course) => {
        // Create an HTML string with the form for editing course data
        const classDetailsHTML = `
            <html>
            <head>
                <title>Edit Class Details</title>
                <style>
                    /* Add your CSS styles here */
                    /* Example styles for form layout */
                    form {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    label {
                        margin-bottom: 8px;
                    }
                    input {
                        margin-bottom: 16px;
                        padding: 8px;
                        width: 100%;
                        box-sizing: border-box;
                    }
                    button {
                        padding: 8px 16px;
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <h2>Edit Class Details - ${course.title}</h2>
                <form id="classDetailsForm">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" value="${course.title}">
                    
                    <!-- Add more input fields for other course properties -->
    
                    <button type="submit">Save Changes</button>
                </form>
                
                <script>
                    // Add JavaScript code here to handle form submission
                    document.getElementById('classDetailsForm').addEventListener('submit', function(event) {
                        event.preventDefault();
                        // Retrieve form data
                        const formData = new FormData(event.target);
                        const updatedCourse = {};
                        for (const [key, value] of formData.entries()) {
                            updatedCourse[key] = value;
                        }
                        // Example: Send updated course data to server to save changes
                        console.log('Updated Course Data:', updatedCourse);
                        // Close the window after saving changes (optional)
                        window.close();
                    });
                </script>
            </body>
            </html>
        `;
    
        // Open a new window with a blank URL
        const newWindow = window.open('', '_blank', 'width=600,height=400');
    
        // Write the HTML string to the new window
        newWindow.document.write(classDetailsHTML);
        
        // Close the document writing
        newWindow.document.close();
    };
>>>>>>> Stashed changes
    
    
    
    
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
            <ClassList classes={classes} />
        </div>
    );
}

export default ManageClassesPage;