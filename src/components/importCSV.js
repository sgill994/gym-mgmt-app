import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

const ImportCSV = ({ onImportCSV }) => {
  const [importedData, setImportedData] = useState([]); // State to store parsed CSV data
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key to reset file input

  // Function to handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a new FileReader instance

    // Callback function when FileReader has loaded the file
    reader.onload = (e) => {
      const text = e.target.result; // The file content
      console.log('File content:', text); // Log the file content
      const parsedData = parseCSVData(text); // Parse the CSV data
      console.log('Parsed Data:', parsedData); // Log the parsed data to verify its structure
      setImportedData(parsedData); // Update state with parsed data
      onImportCSV(parsedData); // Call the parent component's callback with imported data
      resetFileInput(); // Reset file input after successful upload
    };

    reader.onerror = () => {
      console.error('File reading has failed');
      resetFileInput(); // Reset file input on error
    };

    if (file) {
      reader.readAsText(file); // Read the file as text
    } else {
      console.error('No file selected');
      resetFileInput(); // Reset file input if no file selected
    }
  };

  // Function to reset file input
  const resetFileInput = () => {
    setFileInputKey(Date.now()); // Change key to reset file input
  };

  // Function to parse CSV data
  const parseCSVData = (text) => {
    // Split text into rows
    const rows = text.trim().split(/\r?\n/); // Split by new lines
    const headers = rows[0].split(','); // Extract headers from the first row
    const data = rows.slice(1).map((row) => {
      const values = row.split(','); // Split each row into values
      return headers.reduce((obj, header, index) => {
        // Convert headers to camelCase
        const key = header.trim().toLowerCase()
          .replace(/\s+(\w)/g, (_, c) => c.toUpperCase())
          .replace(/\s+/g, ''); // Convert spaces to camelCase
      
        // Special handling for memberID
        if (key === 'memberId') {
          obj['memberID'] = values[index].trim() || uuidv4(); // Fill memberID if blank
        } else if (key === 'archived') {
          obj[key] = values[index].trim().toLowerCase() === 'yes';
        } else {
          obj[key] = values[index].trim(); // Assign value to object property
        }

        return obj;
      }, {});
    });

    return data; // Return parsed data array
  };

  return (
    <div>
      {/* Import input */}
      <input
        key={fileInputKey} // Use key to reset input on change
        type="file"
        onChange={handleFileUpload}
        accept=".csv"
      />
    </div>
  );
};

export default ImportCSV;
