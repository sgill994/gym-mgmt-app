import React, {useState} from 'react';
import '../assets/styles/Classes.css';

const ToggleButton = ({classIsActive, setClassIsActive}) => {
    const toggleSwitch = () => {
        setClassIsActive(!classIsActive);
    }

    return (
        <div className="toggle-container">
            <div className={`toggle-label ${classIsActive ? 'active' : ''}`}>
                {classIsActive ? 'ACTIVE CLASS' : 'INACTIVE CLASS'}
            </div>
            <div className={`toggle-switch ${classIsActive ? 'active' : ''}`} onClick={toggleSwitch}>
                <div className={`toggle-background ${classIsActive ? 'active' : ''}`}>
                    <span className="toggle-text">{classIsActive ? 'ON' : 'OFF'}</span>
                </div>
                <div className={`toggle-button ${classIsActive ? 'active' : ''}`}></div>
            </div>
        </div>
    );
};

export default ToggleButton;