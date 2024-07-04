import React, { useState } from 'react';

const ImportCSV = ({ onImportCSV }) => {
  const [importedData, setImportedData] = useState([]); // State to store parsed CSV data

  // Function to handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a new FileReader instance

    // Callback function when FileReader has loaded the file
    reader.onload = (e) => {
      const text = e.target.result; // The file content
      const parsedData = parseCSVData(text); // Parse the CSV data
      setImportedData(parsedData); // Update state with parsed data
      onImportCSV(parsedData); // Call the parent component's callback with imported data
    };

    reader.onerror = () => {
      console.error('File reading has failed');
    };

    if (file) {
      reader.readAsText(file); // Read the file as text
    } else {
      console.error('No file selected');
    }
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
          if (key === 'archived') {
            obj[key] = values[index].trim().toLowerCase() === 'yes'; // Set archived to true if value is "yes"
          } else {
            obj[key] = values[index] ? values[index].trim() : ''; // Assign value to object property
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
        type="file"
        onChange={handleFileUpload}
        accept=".csv"
      />
    </div>
  );
};

export default ImportCSV;
