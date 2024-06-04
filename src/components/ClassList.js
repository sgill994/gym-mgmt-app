import React from 'react';
import { Table } from 'react-bootstrap';
import ClassDetails from '../components/ClassDetails';

const ClassList = ({ classes }) => {
  const openClassDetails = (course) => {
    const courseInfo = ClassDetails({ course });
    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write(courseInfo);
    newWindow.document.close();
  };

  return (
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
            <td>{course.days.split(', ').length}</td>
            <td>{course.time}</td>
            <td>{course.length}</td>
            <td>{course.reservationLimit ? course.reservationLimit : 'No limit'}</td>
            <td>{course.instructor}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClassList;
