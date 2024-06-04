import React from 'react';

const ClassDetails = ({ course }) => {
  return (
    <div>
      <h1>{course.title}</h1>
      <p><strong>Days:</strong> {course.days}</p>
      <p><strong>Start Time:</strong> {course.time}</p>
      <p><strong>Length:</strong> {course.length}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      {course.reservationLimit && <p><strong>Class Limit:</strong> {course.reservationLimit}</p>}
    </div>
  );
};

export default ClassDetails;
