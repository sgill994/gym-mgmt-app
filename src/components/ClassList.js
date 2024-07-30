import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import ClassDetails from '../components/ClassDetails';
import { FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';
import '../assets/styles/Classes.css';

const ClassList = ({ classes, updateClass, deleteClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  // Sets class associated with row as selected for pop-up window; Class Details Modal show condition
  const openClassDetails = (course) => {
    setSelectedClass(course);
  };

  // Sets selected class to null on pop-up window close; Class Details Modal hide condition
  const closeClassDetails = () => {
    setSelectedClass(null);
  }

  const countDays = (course) => {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].filter(day => course[day]).length;
  }

  // Sets class associated with row to be deleted; Delete Confirm Modal show condition
  const handleDelete = (course) => {
    setClassToDelete(course);
    setDeleteModal(true);
  }

  // Removed class from classes array on delete in Delete Confirm Modal & closes Modal
  const confirmDelete = () => {
    deleteClass(classToDelete.courseID);
    setDeleteModal(false);
    setClassToDelete(null);
  }

  // Resets class to be deleted to null & closes Delete Confirm Modal
  const cancelDelete = () => {
    setDeleteModal(false);
    setClassToDelete(null);
  }

  return (
    <div>
      <Table striped bordered hover className="table-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Weekly Classes</th>
            <th>Start Time</th>
            <th>Length</th>
            <th>Class Limit</th>
            <th>Instructor</th>
            <th>Calendar Color</th>
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
              <td>{course.startTime}</td>
              <td>{course.duration}</td>
              <td>{course.reservationLimit ? course.reservationLimit : 'No limit'}</td>
              <td>{course.instructor}</td>
              <td className="table-cell-center">
                <div className="color-circle" style={{ backgroundColor: course.calendarColor }}></div>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(course)}><FaTimes/></Button>
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
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClassList;
