import React, { useState } from 'react';

const ImportCSV = ({ onImportCSV }) => {
  const [importedData, setImportedData] = useState([]);

  // Function to handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const parsedData = parseCSVData(text);
      setImportedData(parsedData);
      // Pass the parsedData to the parent component or perform further processing
      onImportCSV(parsedData); // Call the parent component's callback with imported data
    };

    reader.readAsText(file);
  };

  // Function to parse CSV data
  const parseCSVData = (text) => {
    // Split text into rows
    const rows = text.trim().split(/\r?\n/);

    // Extract headers from the first row
    const headers = rows[0].split(',');

    // Parse remaining rows into data objects
    const data = rows.slice(1).map((row) => {
      const values = row.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index].trim();
        return obj;
      }, {});
    });

    return data;
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
