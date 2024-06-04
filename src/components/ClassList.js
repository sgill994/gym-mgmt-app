import React from 'react';
import { Table } from 'react-bootstrap'
import ClassDetails from '../components/ClassDetails';


const ClassList = ({ classes }) => {
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
  );
}

export default ClassList;
