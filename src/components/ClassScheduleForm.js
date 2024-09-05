import React, {useState} from 'react'
import {
    classTimeOptions, classDurationOptions, instructorOptions,
    timeStrTo24HourFormat, timeTo12HourFormat, calculateEndTime
} from '../components/ClassAttributes.js';

const { ipcRenderer } = window.require('electron');

const ClassScheduleForm = ({classData}) => {
    const [Monday, setMonday] = useState(false);
    const [Tuesday, setTuesday] = useState(false);
    const [Wednesday, setWednesday] = useState(false);
    const [Thursday, setThursday] = useState(false);
    const [Friday, setFriday] = useState(false);
    const [Saturday, setSaturday] = useState(false);
    const [Sunday, setSunday] = useState(false);
    const [startTimeStr, setStartTimeStr] = useState('');
    const [duration, setDuration] = useState('');
    const [instructor, setInstructor] = useState('');
    const [checkBoxError, setCheckBoxError] = useState('');

    const handleCheckBoxChange = (e) => {
        const {id, checked} = e.target;
        const setDay = {
          Monday: setMonday,
          Tuesday: setTuesday,
          Wednesday: setWednesday,
          Thursday: setThursday,
          Friday: setFriday,
          Saturday: setSaturday,
          Sunday: setSunday,
        }[id];
        setDay(checked);
      };

    const handleScheduleSubmit = (e) => {
        e.preventDefault();

        // Check at least one day has been selected
        if (![Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday].some(Boolean)) {
            setCheckBoxError('Please select at least one day.');
            return;
        }

        // Parse selected start time from dropdown, convert to 24-hour format & create Date object
        const [startHour24, startMin24] = timeStrTo24HourFormat(startTimeStr);
        let startDateTime = new Date();
        startDateTime.setHours(parseInt(startHour24), parseInt(startMin24), 0, 0);
        const [startHour12, startMin, startTimeMod] = timeTo12HourFormat(startDateTime);
        const [endTimeStr, endDateTime, endHour24, endHour12, endMin, endTimeMod] = calculateEndTime(startDateTime, duration);
        
        // Concatenate scheduling details with existing classData
        const completeClassData = {
        ...classData, 
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday,
        startTimeStr, 
        startDateTime, // manual update req'd
        startHour24: parseInt(startHour24), // manual update req'd
        startHour12, // manual update req'd
        startMin, // manual update req'd
        startTimeMod, // manual update req'd
        endTimeStr, // manual update req'd
        endDateTime, // manual update req'd
        endHour24, // manual update req'd
        endHour12, // manual update req'd
        endMin, // manual update req'd
        endTimeMod, // manual update req'd
        duration,
        instructor
        };

        // Send complete data to main window to add the class
        ipcRenderer.send('add-class', completeClassData);
    };

    return (
        <form className="new-class-form" id="new-class-form" onSubmit={handleScheduleSubmit}>
            <h3>Schedule {classData.title}</h3>
            <div className="class-schedule-days">
                <label htmlFor="class-days">Class Schedule Days: </label><br />
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day}>
                    <label>{day}</label>
                    <input type="checkbox" id={day} check={{Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday}[day]} onChange={handleCheckBoxChange} /><br />
                </div>
                ))}
            </div>
            {checkBoxError && <div className="text-danger">{checkBoxError}</div>}
            <div className="class-start-time">
                <label htmlFor="class-start-time">Class Start Time:</label>
                <select className="start-time-select" value={startTimeStr} onChange={(e) => setStartTimeStr(e.target.value)} required>
                    <option selected disabled value="">--:--</option>
                    {classTimeOptions.map(time => (
                    <option key={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div className="class-duration">
                <label htmlFor="class-duration">Class Length: </label>
                <select className="duration-select" value={duration} onChange={(e) => setDuration(e.target.value)} required>
                    <option selected disabled value=""> --- </option>
                    {classDurationOptions.map(duration => (
                    <option key={duration}>{duration}</option>
                    ))}
                </select>
            </div>
            <div className="class-instructor">
                <label htmlFor="class-instructor">Class Instructor:</label>
                <select className="instructor-select" value={instructor} onChange={(e) => setInstructor(e.target.value)} required>
                    <option selected disabled value=""> --- </option>
                    {instructorOptions.map(instructor => (
                    <option key={instructor}>{instructor}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Save Schedule</button>
        </form>
    );
};

export default ClassScheduleForm;