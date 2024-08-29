
import React from 'react';
import '../assets/styles/Classes.css';

const SelectableLists = ({selectedOptions, setSelectedOptions, availableOptions, setAvailableOptions}) => {
    const handleSelect = (option) => {
        setAvailableOptions(availableOptions.filter((item) => item !== option));
        setSelectedOptions([...selectedOptions, option]);
    };
    
    const handleDeSelect = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
    setAvailableOptions([...availableOptions, option]);
    };

    const handleSelectAll = () => {
    setSelectedOptions([...selectedOptions, ...availableOptions]);
    setAvailableOptions([]);
    };

    const handleClearAll = () => {
    setAvailableOptions([...availableOptions, ...selectedOptions]);
    setSelectedOptions([]);
    };

    return (
        <div className="lists-wrapper">
            <div className="list-container">
            <div className="list-header">
                <label>Available</label>
                <div className="actions">
                <a href="#" onClick={handleSelectAll}>Select All</a>
                </div>
            </div>
            <div className="list">
                <input type="text" placeholder="Search" />
                <ul>
                {availableOptions.map((option, index) => (
                    <li key={index} onClick={() => handleSelect(option)}>{option}</li>
                ))}
                </ul>
            </div>
            </div>
            <div className="list-container">
            <div className="list-header">
                <label>Selected</label>
                <div className="actions">
                <a href="#" onClick={handleClearAll}>Clear All</a>
                </div>
            </div>
            <div className="list">
                <ul>
                {selectedOptions.map((option, index) => (
                    <li key={index} onClick={() => handleDeSelect(option)}>{option}</li>
                ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default SelectableLists;