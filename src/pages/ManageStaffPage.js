import React from 'react';
import generateTable from '..components/TableGenerator'; // Import the table generator function

const YourComponent = ({ addMember }) => {
  return (
    <div>
        <style>
        console.console.log({addMember});
        </style>
        {/* Call the table generator function with your data */}
        {generateTable(addMember)}
    </div>
  );
}

export default YourComponent;
