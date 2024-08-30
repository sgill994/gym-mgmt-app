import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../assets/styles/Classes.css';

const RadioButtons = ({labels, values, icons, selectedValue, setSelectedValue}) => {
    return (
        <div className="radio-group">
            {labels.map((label, index) => (
                <React.Fragment key={index}>
                    <input
                        type="radio"
                        id={`radio-${label}`}
                        value={values[index]}
                        checked={selectedValue === values[index]}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        className="radio-input"
                    />
                    <label htmlFor={`radio-${label}`} className={`radio-box ${selectedValue === values[index] ? 'selected' : ''}`}>
                        <small>{label}</small>
                        <span><FontAwesomeIcon icon={icons[index]} /></span>
                    </label>
                </React.Fragment>
            ))}
        </div>
    );
};

export default RadioButtons;