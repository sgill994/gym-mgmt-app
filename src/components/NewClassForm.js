import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {PhotoshopPicker} from 'react-color';
import ParagraphInput from '../components/ParagraphInput.js';
import ToggleButton from '../components/ToggleButton.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandHoldingDollar, faFileInvoiceDollar} from '@fortawesome/free-solid-svg-icons';
import images from '../assets/images';
import '../assets/styles/Classes.css';
import {colorOptions, classTimeOptions, classDurationOptions,
        handleColorChange, toggleColorPicker, handleColorChangePicker, handleColorSave, handleColorCancel,
        timeStrTo24HourFormat, timeTo12HourFormat, calculateEndTime} from '../components/ClassAttributes.js';

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
  const [calendarColor, setCalendarColor] = useState('#4A90E2');
  const [tempColor, setTempColor] = useState('#4A90E2')
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [serviceCategory, setServiceCategory] = useState('');
  const [description, setDescription] = useState('');
  const [classIsActive, setClassIsActive] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState(false);
  const [specialDescription, setSpecialDescription] = useState('');
  const [paymentOption, setPaymentOption] = useState('');

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
    // Check at least one day has been selected
    if (![Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday].some(Boolean)) {
      setCheckBoxError('Please select at least one day.');
      return;
    }
    // Check a reservation limit is number if checkbox selected
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
    
    // Store all computed & form values into class object
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
      limitReservations,
      reservationLimit: limitReservations ? reservationLimit : undefined,
      serviceCategory,
      description,
      specialDescription,
      classIsActive,
      paymentOption,
      clientsBooked: 0, // manual update req'd
      waitlist: 0, // manual update req'd
      dateCreated: new Date(),
      lastEdited: new Date() // manual update req'd (TO DO onSubmit function in ClassDetails)
    };
    addClass(course);
  };

    return (
    <form id="new-class-form" onSubmit={handleSubmit}>
      <div className="class-form-group">
        <label htmlFor="course-name">Class Name:</label>
        <input type="text" name="course-name" className="class-form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="service-type">Service Category</label>
        <select name="service-type-select" value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} required>
          <option>Class</option>
          <option>Event</option>
        </select>
      </div>
      <div>
        <div className={`toggle-label ${classIsActive ? 'active' : ''}`}>
          {classIsActive ? 'ACTIVE CLASS' : 'INACTIVE CLASS'}
        </div>
        <div className="toggle-container">
          <ToggleButton isActive={classIsActive} setIsActive={setClassIsActive} />
        </div>
      </div>
      <div>
        <label htmlForm="description">Description</label>
        <ParagraphInput description={description} setDescription={setDescription} />
      </div>
      <div>
        <label htmlForm="spec-description">Special Instructions</label>
        <div className="special-instructions-container">
          <ToggleButton isActive={specialInstructions} setIsActive={setSpecialInstructions} /> 
          <label className="special-instructions-label">
            Only display special instructions to clients who have booked this class
          </label>
        </div>
        <ParagraphInput description={specialDescription} setDescription={setSpecialDescription}/>
      </div>
      <label htmlFor="calendar-color-select">Calendar Color:</label> 
      <div className="class-form-group color-picker-container">
        <div className="color-picker-button" onClick={() => toggleColorPicker(showColorPicker, setShowColorPicker)}>
          <img src={images.dropdownButtonImage} alt="Dropdown" className="dropdown-image" />
          <div className="color-circle-overlay" style={{backgroundColor: calendarColor}}></div>
        </div>
        <div className="color-options-container"> 
          &nbsp;&nbsp;
          {colorOptions.map((option) => (
            <div
              key={option.value}
              className="color-circle"
              style={{backgroundColor: option.hex}}
              onClick={() => handleColorChange(option, setCalendarColor)}
            />
          ))}
        </div>
      </div>
      {showColorPicker && (
        <div className="color-picker-popup">
          <PhotoshopPicker 
            color={tempColor} 
            onChangeComplete={(color) => handleColorChangePicker(color, setTempColor)}
            onAccept={() => handleColorSave(tempColor, setCalendarColor, setShowColorPicker)}
            onCancel={() => handleColorCancel(calendarColor, setTempColor, setShowColorPicker)} 
          />
        </div>
      )}
      <div>
        <label>Purchase Rules</label><br/>
        <div className="payment-options">
          <div className="radio-group">
            <input 
              type="radio" 
              id="sell-sessions" 
              value="Sell Sessions" 
              checked={paymentOption === 'Sell Sessions'}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="radio-input"
            />
            <label htmlFor="sell-sessions" className={`radio-box ${paymentOption === 'Sell Sessions' ? 'selected' : ''}`}>
              Sell Individual Sessions
              <span><FontAwesomeIcon icon={faHandHoldingDollar} /></span>
            </label>
            <input
              type="radio"
              id="do-not-sell-sessions"
              value="Do Not Sell Sessions"
              checked={paymentOption === 'Do Not Sell Sessions'}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="radio-input"
            />
            <label htmlFor="do-not-sell-sessions" className={`radio-box ${paymentOption === 'Do Not Sell Sessions' ? 'selected' : ''}`}>
              Do Not Sell Individual Sessions 
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
            </label>
          </div>
        </div>
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
            {classTimeOptions.map(time => (
              <option key={time}>{time}</option>
            ))}
        </select>
      </div>
      <div className="class-form-group">
        <label htmlFor="class-length-select">Class Length: </label>
        <select className="length-form-select" id="class-length-select" value={duration} onChange={(e) => setDuration(e.target.value)} required>
            <option selected disabled value=""> --- </option>
            {classDurationOptions.map(duration => (
              <option key={duration}>{duration}</option>
            ))}
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
