import React from 'react';

const ClassDetails = ({ course }) => {
  const classDetailsHTML = `
    <html>
    <head>
        <title>Edit Class Details</title>
        <style>
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
            <label for="days">Days:</label>
            <input type="text" id="days" name="days" value="${course.days}">
            <label for="time">Start Time:</label>
            <input type="text" id="time" name="time" value="${course.time}">
            <label for="length">Length:</label>
            <input type="text" id="length" name="length" value="${course.length}">
            <label for="instructor">Instructor:</label>
            <input type="text" id="instructor" name="instructor" value="${course.instructor}">
            ${course.reservationLimit ? `<label for="reservationLimit">Class Limit:</label>
            <input type="text" id="reservationLimit" name="reservationLimit" value="${course.reservationLimit}">` : ''}
            <button type="submit">Save Changes</button>
        </form>
        
        <script>
            document.getElementById('classDetailsForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                const updatedCourse = {};
                for (const [key, value] of formData.entries()) {
                    updatedCourse[key] = value;
                }
                console.log('Updated Course Data:', updatedCourse);
                window.close();
            });
        </script>
    </body>
    </html>
  `;

  return classDetailsHTML;
};

export default ClassDetails;
