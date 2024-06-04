import React from 'react';

const ClassList = ({ classes }) => (
  <ul id="classes-list" className="class-list-group">
    {classes.map((course, index) => (
      <li key={index} className="class-list-item">
        {course.title} on {course.days} at {course.time} for {course.length} - Instructor: {course.instructor} 
        {course.reservationLimit && ` - Class Limit: ${course.reservationLimit}`}
      </li>
    ))}
  </ul>
);

export default ClassList;
