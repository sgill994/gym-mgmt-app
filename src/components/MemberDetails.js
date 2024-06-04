import React from 'react';

const MemberDetails = ({ member }) => {
    const memberDetailsHTML = `
    <html>
    <head>
        <title>Edit Member Details</title>
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
        <h2>Edit Member Details</h2>
        <form id="memberDetailsForm">
            <label for="first-name">First Name: </label>
            <input type="text" id="first-name" name="first-name" value="${member.firstName}">
            <label for="last-name">Last Name: </label>
            <input type="text" id="last-name" name="last-name" value="${member.lastName}">
            <label for="phone">Phone Number: </label>
            <input type="text" id="phone" name="phone" value="${member.phoneNumber}">
            <label for="email">Email: </label>
            <input type="text" id="email" name="email" value="${member.email}">
            <button type="submit">Save Changes</button>
        </form>
        
        <script>
            document.getElementById('memberDetailsForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                const updatedMember = {};
                for (const [key, value] of formData.entries()) {
                    updatedMember[key] = value;
                }
                console.log('Updated Member Data:', updatedMember);
                window.close();
            });
        </script>
    </body>
    </html>
  `;
  
  return memberDetailsHTML;
};

export default MemberDetails;
