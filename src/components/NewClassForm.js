import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../assets/styles/Classes.css';
import Select from 'react-select';


const NewClassForm = ({ addClass }) => {
  const [title, setTitle] = useState('');
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
  const [limitReservations, setLimitReservations] = useState(false);
  const [reservationLimit, setReservationLimit] = useState('');
  const [checkBoxError, setCheckBoxError] = useState('');
  const [reservationError, setReservationError] = useState('');
  const [calendarColor, setCalendarColor] = useState('');

  const colorOptions = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Cyan', hex: '#00FFFF' },
    { name: 'Magenta', hex: '#FF00FF' },
    { name: 'Lime', hex: '#00FF00' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Sky Blue', hex: '#87CEEB' },
    { name: 'Coral', hex: '#FF7F50' }
  ].map(color => ({ value: color.hex, label: color.name, color: color.hex }));

  // Convert a string of format HH:MM AM/PM to 24-hour format
  const timeStrTo24HourFormat = (timeStr) => {
    const [timePart, modifier] = timeStr.split(' ');
    let [hour, min] = timePart.split(':');
    if (hour === '12') {
        hour = '00';
    }
    if (modifier === 'PM') {
        hour = parseInt(hour, 10) + 12;
    }
    return [hour, min];
};

  // Returns 12-hour format time from Date object
  const timeTo12HourFormat = (datetime) => {
    const hour24 = datetime.getHours();
    const min = datetime.getMinutes();
    const mod = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;

    return [hour12, min, mod]
  }

  // Compute numeric class duration from dropdown selection
  const calculateDurationMinutes = (duration) => {
    const durationParts = duration.split(' ');
    let totalMin = 0;
    for (let i = 0; i < durationParts.length; i += 2) {
        // Extract hours, multiply by 60, & add to running sum
        if (durationParts[i + 1] === 'hr') {
            totalMin += parseInt(durationParts[i]) * 60;
        // Extract minutes & add to running sum
        } else if (durationParts[i + 1] === 'min') {
            totalMin += parseInt(durationParts[i]);
        }
    }
    return totalMin;
  }

  const calculateEndTime = (startTime, duration) => {
    const totalMin = calculateDurationMinutes(duration);
    // Create end time Date object by adding minutes of duration to start time Date object
    const endTime = new Date (startTime.setMinutes(startTime.getMinutes() + totalMin));
    // Convert 24-hour format end time to 12-hour format
    const [endHour12, endMin, endMod] = timeTo12HourFormat(endTime);
    
    return [`${endHour12.toString()}:${endMin.toString().padStart(2, '0')} ${endMod}`, endTime, endTime.getHours(), endHour12, endMin, endMod];
};

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (![Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday].some(Boolean)) {
      setCheckBoxError('Please select at least one day.');
      return;
    }

    if (limitReservations && !(/^\d*$/.test(reservationLimit))) {
      setReservationError('Please enter a valid number.');
      return;
    }

    const courseID = uuidv4();
    // Parse selected start time from dropdown, convert to 24-hour format & create Date object
    const [startHour24, startMin24] = timeStrTo24HourFormat(startTimeStr);
    let startDateTime = new Date();
    startDateTime.setHours(parseInt(startHour24), parseInt(startMin24), 0, 0);
    const [startHour12, startMin, startTimeMod] = timeTo12HourFormat(startDateTime);
    const [endTimeStr, endDateTime, endHour24, endHour12, endMin, endTimeMod] = calculateEndTime(startDateTime, duration);
    
    const course = {
      courseID,
      title, 
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
      instructor, 
      calendarColor,
      reservationLimit: limitReservations ? reservationLimit : undefined,
      clientsBooked: 0, // manual update req'd
      waitlist: 0, // manual update req'd
      dateCreated: new Date(),
      lastEdited: new Date() // manual update req'd
    };

    addClass(course);

    setTitle('');
    setMonday(false);
    setTuesday(false);
    setWednesday(false);
    setThursday(false);
    setFriday(false);
    setSaturday(false);
    setSunday(false);
    setStartTimeStr('');
    setDuration('');
    setInstructor('');
    setCheckBoxError('');
    setLimitReservations(false);
    setReservationLimit('');
    setReservationError('');
  };

    return (
    <form id="new-class-form" onSubmit={handleSubmit}>
      <div className="class-form-group">
        <label htmlFor="course-name">Class Name:</label>
        <input type="text" id="course-name" className="class-form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="class-form-group">
        <label htmlFor="course-day">Class Schedule Days: </label><br />
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <div key={day}>
            <label>{day}</label>
            <input type="checkbox" id={day} check={{Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday}[day]} onChange={handleCheckBoxChange} /><br />
          </div>
        ))}
      </div>
      {checkBoxError && <div className="text-danger">{checkBoxError}</div>}
      <div className="class-form-group">
        <label htmlFor="class-time-select">Class Start Time:</label>
        <select className="time-form-select" id="class-time-select" value={startTimeStr} onChange={(e) => setStartTimeStr(e.target.value)} required>
            <option selected disabled value="">--:--</option>
            <option>8:00 AM</option>
            <option>8:15 AM</option>
            <option>8:30 AM</option>
            <option>8:45 AM</option>
            <option>9:00 AM</option>
            <option>9:15 AM</option>
            <option>9:30 AM</option>
            <option>9:45 AM</option>
            <option>10:00 AM</option>
            <option>10:15 AM</option>
            <option>10:30 AM</option>
            <option>10:45 AM</option>
            <option>11:00 AM</option>
            <option>11:15 AM</option>
            <option>11:30 AM</option>
            <option>11:45 AM</option>
            <option>12:00 PM</option>
            <option>12:15 PM</option>
            <option>12:30 PM</option>
            <option>12:45 PM</option>
            <option>1:00 PM</option>
            <option>1:15 PM</option>
            <option>1:30 PM</option>
            <option>1:45 PM</option>
            <option>2:00 PM</option>
            <option>2:15 PM</option>
            <option>2:30 PM</option>
            <option>2:45 PM</option>
            <option>3:00 PM</option>
            <option>3:15 PM</option>
            <option>3:30 PM</option>
            <option>3:45 PM</option>
            <option>4:00 PM</option>
            <option>4:15 PM</option>
            <option>4:30 PM</option>
            <option>4:45 PM</option>
            <option>5:00 PM</option>
            <option>5:15 PM</option>
            <option>5:30 PM</option>
            <option>5:45 PM</option>
            <option>6:00 PM</option>
            <option>6:15 PM</option>
            <option>6:30 PM</option>
            <option>6:45 PM</option>
            <option>7:00 PM</option>
            <option>7:15 PM</option>
            <option>7:30 PM</option>
            <option>7:45 PM</option>
            <option>8:00 PM</option>
            <option>8:15 PM</option>
            <option>8:30 PM</option>
            <option>8:45 PM</option>
            <option>8:00 PM</option>
            <option>8:15 PM</option>
            <option>8:30 PM</option>
            <option>8:45 PM</option>
            <option>9:00 PM</option>
          </select>
      </div>
      <div className="class-form-group">
        <label htmlFor="class-length-select">Class Length: </label>
        <select className="length-form-select" id="class-length-select" value={duration} onChange={(e) => setDuration(e.target.value)} required>
            <option selected disabled value=""> --- </option>
            <option>30 min</option>
            <option>45 min</option>
            <option>60 min</option>
            <option>1 hr 15 min</option>
            <option>1 hr 30 min</option>
            <option>1 hr 45 min</option>
            <option>2 hr</option>
            <option>2 hr 15 min</option>
            <option>2 hr 30 min</option> 
        </select>
      </div>
      <div className="class-form-group">
        <label htmlFor="class-instructor-select">Class Instructor:</label>
        <select className="instructor-form-select" id="class-instructor-select" value={instructor} onChange={(e) => setInstructor(e.target.value)} required>
            <option selected disabled value=""> --- </option>
            <option>Oneal Mendoza</option>
            <option>Sandeep Mendoza</option>
            <option>Michael Viloria</option>
            <option>Terrence Viloria</option>
            <option>Angelo Viloria</option>
            <option>Naseem Bains</option>
            <option>Iain Small</option>
            <option>Alvin Valle</option>
          </select>
      </div>
      <div className="class-form-group">
        <label htmlFor="calendar-color-select">Calendar Color:</label>
        <Select 
          id="calendar-color-select" 
          className="react-select-container"
          classNamePrefix="react-select"
          options={colorOptions} 
          value={colorOptions.find(option => option.value === calendarColor)} 
          onChange={(selectedOption) => setCalendarColor(selectedOption.value)}
          formatOptionLabel={option => (
            <div className="color-option" data-color={option.color}>
              {option.label}
            </div>
          )}
        />
      </div>
      <div className="class-form-group">
        <label htmlFor="limit-reservations">
          <input type="checkbox" id="limit-reservations" checked={limitReservations} onChange={(e) => setLimitReservations(e.target.checked)} />
          Limit Number of Reservations 
        </label>
      </div>
      {limitReservations && (
        <div className="class-form-group">
          <label htmlFor="reservation-limit"> Reservation Limit: </label>
          <input type="text" id="reservation-limit" className="class-form-control" value={reservationLimit} onChange={(e) => setReservationLimit(e.target.value)} required/>
          {reservationError && <div className="text-danger">{reservationError}</div>}
        </div>
      )}
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default NewClassForm;
