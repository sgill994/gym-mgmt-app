import React from 'react';

const ClassList = ({ classes }) => (
  <ul id="classes-list">
    {classes.map((course, index) => (
      <li key={index}>
        {course.title} {course.day} {course.time} {course.length} - {course.instructor}
      </li>
    ))}
  </ul>
);

export default ClassList;
