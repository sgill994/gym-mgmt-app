import React, {useState} from 'react';
import '../assets/styles/Classes.css';

const ToggleButton = ({isActive, setIsActive}) => {
    const toggleSwitch = () => {
        setIsActive(!isActive);
    }

    return (
        <div className={`toggle-switch ${isActive ? 'active' : ''}`} onClick={toggleSwitch}>
            <div className={`toggle-background ${isActive ? 'active' : ''}`}>
                <span className="toggle-text">{isActive ? 'ON' : 'OFF'}</span>
            </div>
            <div className={`toggle-button ${isActive ? 'active' : ''}`}></div>
        </div>
    );
};

export default ToggleButton;