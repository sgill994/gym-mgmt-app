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
            .hidden{
                display:none
            }
        </style>
    </head>
    <body>
        <header> 
            <h2>Member Details</h2>
            <button id="edit-button">Edit</button>
            <button id="cancel-button" class="hidden">Cancel</button>
        </header>
        <form id="memberDetailsForm">
            <label for="first-name">First Name: </label>
            <input type="text" id="first-name" name="firstName" value="${member.firstName}" readonly>
            <label for="last-name">Last Name: </label>
            <input type="text" id="last-name" name="lastName" value="${member.lastName}" readonly>
            <label for="phone">Phone Number: </label>
            <input type="text" id="phone" name="phoneNumber" value="${member.phoneNumber}"readonly>
            <label for="email">Email: </label>
            <input type="text" id="email" name="email" value="${member.email}" readonly>
            <button type="submit" id="save-button" class="hidden">Save Changes</button>
        </form>
        
        <script>
            const editButton = document.getElementById('edit-button');
            const saveButton = document.getElementById('save-button');
            const cancelButton = document.getElementById('cancel-button');
            const formFields = document.querySelectorAll('input');
            const originalValues = {};

            formFields.forEach(field => {originalValues[field.id] = field.value;});

            editButton.addEventListener('click', function() {
                formFields.forEach(field => field.removeAttribute('readonly'));
                saveButton.classList.remove('hidden');
                cancelButton.classList.remove('hidden');
                editButton.classList.add('hidden');
            });

            cancelButton.addEventListener('click', function() {
                formFields.forEach(field => {
                    field.setAttribute('readonly', true);
                    field.value = originalValues[field.id];
                });
                saveButton.classList.add('hidden');
                cancelButton.classList.add('hidden');
                editButton.classList.remove('hidden');
            });

            document.getElementById('memberDetailsForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                const updatedMember = {};
                
                for (const [key, value] of formData.entries()) {
                    updatedMember[key] = value;
                }

                window.opener.updateMember(updatedMember, originalValues);
                
                formFields.forEach(field => {
                    field.setAttribute('readonly', true);
                    field.value = updatedValues[field.id];
                });

                saveButton.classList.add('hidden');
                cancelButton.classList.add('hidden');
                editButton.classList.remove('hidden');
                setTimeout(() => window.close(), 100);
            });
        </script>
    </body>
    </html>
  `;
  
  return memberDetailsHTML;
};

export default MemberDetails;
