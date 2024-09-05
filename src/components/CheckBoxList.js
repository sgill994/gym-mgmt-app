import React, {useState} from 'react';
import '../assets/styles/Classes.css'

const CheckBoxList = ({classOptions, prerequisites, setPrerequisites}) => {
    const handleToggleClass = (className) => {
        setPrerequisites((prev) => {
            const updated = {...prev};
            if (updated[className] !== undefined) {
                delete updated[className];
            } else {
                updated[className] = 0;
            }
            return updated;
        });
    };

    const handleVisitsChange = (className, visits) => {
        setPrerequisites((prev) => ({
            ...prev,
            [className]: visits,
        }));
    };

    return (
        <div className="custom-checklist">
            <div className="checklist-header">
                <label>
                    <input 
                        type="checkbox"
                        onChange={(e) =>
                            e.target.checked
                            ? setPrerequisites(classOptions.reduce((acc, className) => ({...acc, [className]: 0}), {}))
                            : setPrerequisites({})
                        }
                    />
                    Select All
                </label>
                <span className="visits-header">Number of Visits</span>
            </div>
            <div className="checklist-items">
                {classOptions.map((className) => (
                    <div key={className} className="checklist-item">
                        <label>
                            <input 
                                type="checkbox"
                                checked={prerequisites[className] !== undefined}
                                onChange={() => handleToggleClass(className)}
                            />
                            {className}
                        </label>
                        {prerequisites[className] !== undefined && (
                            <input 
                                type="number"
                                min="0"
                                value={prerequisites[className]}
                                onChange={(e) => handleVisitsChange(className, e.target.value)}
                                className="visits-input"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckBoxList;