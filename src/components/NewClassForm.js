import React, { useState } from 'react';

const NewClassForm = ({ addClass }) => {
  const [title, setTitle] = useState('');
  const [days, setDays] = useState([]);
  const [time, setTime] = useState('');
  const [length, setLength] = useState('');
  const [instructor, setInstructor] = useState('');
  const [limitReservations, setLimitReservations] = useState(false);
  const [reservationLimit, setReservationLimit] = useState('');
  const [checkBoxError, setCheckBoxError] = useState('');
  const [reservationError, setReservationError] = useState('');


  const handleCheckBoxChange = (e) => {
    const {id, checked } = e.target;
    if (checked) {
      setDays([...days, id]);
    } else {
      setDays(days.filter(day => day !== id))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (days.length === 0) {
      setCheckBoxError('Please select at least one day.');
      return;
    }
    if (limitReservations && !(/^\d*$/.test(reservationLimit))) {
      setReservationError('Please enter a valid number.');
      return;
    }
    const course = {title, days: days.join(', '), time, length, instructor}
    if (limitReservations) {
      course.reservationLimit = reservationLimit;
    }
    addClass(course);
    setTitle('');
    setDays([]);
    setTime('');
    setLength('');
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
        <label htmlFor="mon-check"> Monday </label>
        <input type="checkbox" id="Monday" checked={days.includes('Monday')} onChange={handleCheckBoxChange}/><br />
        <label htmlFor="tues-check"> Tuesday </label>
        <input type="checkbox" id="Tuesday" checked={days.includes('Tuesday')} onChange={handleCheckBoxChange}/><br />
        <label htmlFor="weds-check"> Wednesday </label>
        <input type="checkbox" id="Wednesday" checked={days.includes('Wednesday')} onChange={handleCheckBoxChange}/><br />
        <label htmlFor="thurs-check"> Thursday </label>
        <input type="checkbox" id="Thursday" checked={days.includes('Thursday')} onChange={handleCheckBoxChange}/><br />
        <label htmlFor="fri-check"> Friday </label>
        <input type="checkbox" id="Friday" checked={days.includes('Friday')} onChange={handleCheckBoxChange}/><br />
        <label htmlFor="sat-check"> Saturday </label>
        <input type="checkbox" id="Saturday" checked={days.includes('Saturday')} onChange={handleCheckBoxChange}/><br />
        <label htmlFor="sun-check"> Sunday </label>
        <input type="checkbox" id="Sunday" checked={days.includes('Sunday')} onChange={handleCheckBoxChange}/><br />
      </div>
      {checkBoxError && <div className="text-danger">{checkBoxError}</div>}
      <div className="class-form-group">
        <label htmlFor="class-time-select">Class Start Time:</label>
        <select className="time-form-select" id="class-time-select" value={time} onChange={(e) => setTime(e.target.value)} required>
            <option selected disabled value="">--:--</option>
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
          </select>
      </div>
      <div className="class-form-group">
        <label htmlFor="class-length-select">Class Length: </label>
        <select className="length-form-select" id="class-length-select" value={length} onChange={(e) => setLength(e.target.value)} required>
            <option selected disabled value=""> --- </option>
            <option>45 min</option>
            <option>60 min</option>
            <option>1 hr 15 min</option>
            <option>1 hr 30 min</option>
            <option>1 hr 45 min</option>
            <option>2 hr</option>
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
