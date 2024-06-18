import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import ClassDetails from '../components/ClassDetails';

const ClassList = ({ classes, updateClass, deleteClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  const openClassDetails = (course) => {
    setSelectedClass(course);
  };

  const closeClassDetails = () => {
    setSelectedClass(null);
  }

  const countDays = (course) => {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].filter(day => course[day]).length;
  }

  const handleDelete = (course) => {
    setClassToDelete(course);
    setDeleteModal(true);
  }

  const confirmDelete = () => {
    deleteClass(classToDelete.courseID);
    setDeleteModal(false);
    setClassToDelete(null);
  }

  const cancelDelete = () => {
    setDeleteModal(false);
    setClassToDelete(null);
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weekly Classes</th>
            <th>Start Time</th>
            <th>Length</th>
            <th>Class Limit</th>
            <th>Instructor</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((course, index) => (
            <tr key={index}>
              <td>
                <a href="#" style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => openClassDetails(course)}>
                  {course.title}
                </a>
              </td>
              <td>{countDays(course)}</td>
              <td>{course.time}</td>
              <td>{course.length}</td>
              <td>{course.reservationLimit ? course.reservationLimit : 'No limit'}</td>
              <td>{course.instructor}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(course)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={selectedClass !== null} onHide={closeClassDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Class Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClass && (<ClassDetails course={selectedClass} updateClass={updateClass} closeDetails={closeClassDetails} />)}
        </Modal.Body>
      </Modal>

      <Modal show={deleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to permanently delete this class?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClassList;
