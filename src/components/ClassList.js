import React, { useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import ClassDetails from '../components/ClassDetails';

const ClassList = ({ classes, updateClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);

  const openClassDetails = (course) => {
    setSelectedClass(course);
  };

  const closeClassDetails = () => {
    setSelectedClass(null);
  }

  const countDays = (course) => {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].filter(day => course[day]).length;
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
    </div>
  );
};

export default ClassList;
