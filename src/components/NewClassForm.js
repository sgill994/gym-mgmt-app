import React from 'react';

const NewClassForm = ({ addClass }) => (
  <form
    id="new-class-form"
    onSubmit={(e) => {
      e.preventDefault();
      const title = e.target['course-name'].value;
      const day = e.target['course-day'].value;
      const time = e.target['course-time'].value;
      const length = e.target['course-length'].value;
      const instructor = e.target['course-instructor'].value;

      addClass({ courseName, day, time, courseLength, instructor });
      e.target.reset();
    }}
  >
    <label htmlFor="course-name">Class Name:</label>
    <input type="text" id="course-name" required /><br />
    <label htmlFor="course-day">Class Schedule Days: </label>
    <input type="text" id="course-day" required /><br />
    <label htmlFor="course-time">Class Start Time:</label>
    <input type="text" id="course-time" required /><br />
    <label htmlFor="course-length">Class Length: </label>
    <input type="text" id="course-length" required /><br />
    <button type="submit">Save</button>
  </form>
);

export default NewClassForm;
