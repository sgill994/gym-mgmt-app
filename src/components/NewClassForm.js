import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {PhotoshopPicker} from 'react-color';
import ParagraphInput from '../components/ParagraphInput.js';
import ToggleButton from '../components/ToggleButton.js';
import SelectableLists from '../components/SelectableLists.js';
import RadioButtons from '../components/RadioButtons.js';
import images from '../assets/images';
import '../assets/styles/Classes.css';
import {colorOptions, classTimeOptions, classDurationOptions, purchaseOptions, instructorOptions,
        handleColorChange, toggleColorPicker, handleColorChangePicker, handleColorSave, handleColorCancel,
        timeStrTo24HourFormat, timeTo12HourFormat, calculateEndTime} from '../components/ClassAttributes.js';
import {faHandHoldingDollar, faFileInvoiceDollar, faCalendarXmark, faCalendarCheck, faUserLock,
        faCreditCard, faPersonCircleCheck, faCommentsDollar,
        faClipboardList, faEyeSlash, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons';

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
  const [individualSessions, setIndividualSessions] = useState('');
  const [bookOnline, setBookOnline] = useState('');
  const [groupAllowedBooking, setGroupsAllowedBooking] = useState([]);
  const [purchaseTime, setPurchaseTime] = useState('');
  const [purchaseOptsVisible, setPurchaseOptsVisible] = useState('');
  const [ageRestriction, setAgeRestriction] = useState('');
  const [ageRestrictionType, setAgeRestrictionType] = useState('');
  const [ageRestricted, setAgeRestricted] = useState('');
  const [availableOptions, setAvailableOptions] = useState([...purchaseOptions]);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
      paymentOptions: selectedOptions,
      individualSessions,
      bookOnline,
      purchaseTime,
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
      <div className="purchase-options-container">
        <label>Clients can use these Purchase Options</label>
        <SelectableLists 
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          availableOptions={availableOptions}
          setAvailableOptions={setAvailableOptions}
        />
      </div>
      <label>Purchase Rules</label><br/>
      <div className="individual-sessions">
        <RadioButtons 
          labels={['Sell Individual Sessions', 'Do Not Sell Individual Sessions']}
          values={['Sell Sessions', 'Do Not Sell Sessions']}
          icons={[faHandHoldingDollar, faFileInvoiceDollar]}
          selectedValue={individualSessions}
          setSelectedValue={setIndividualSessions}
        />
      </div>
      <div className="purchase-time">
        <RadioButtons 
          labels={['Client must purchase online at time of booking', 'Client can only pay when they visit', 'Client can pay online or when they visit']}
          values={['Purchase Online', 'Purchase During Visit', 'Purchase Anytime']}
          icons={[faCreditCard, faPersonCircleCheck, faCommentsDollar]}
          selectedValue={purchaseTime}
          setSelectedValue={setPurchaseTime}
        />
      </div>
      <div className="purchase-opts-visibility">
        <RadioButtons 
          labels={['Display applicable Purchase Options during booking', 'Hide applicable Purchase Options from clients']}
          values={['Purchase Options Visible', 'Purchase Options Hidden']}
          icons={[faClipboardList, faEyeSlash]}
          selectedValue={purchaseOptsVisible}
          setSelectedValue={setPurchaseOptsVisible}
        />
      </div>
      <div className="online-booking">
        <label>Client Online Booking</label>
        <RadioButtons
            labels={['Clients Can Book online', 'Disable Online Booking', 'Selected Clients Groups Can Book Online']}
            values={['Can Book Online', 'Cannot Book Online', 'Specific Groups Only']}
            icons={[faCalendarCheck, faCalendarXmark, faUserLock]}
            selectedValue={bookOnline}
            setSelectedValue={setBookOnline}
          />
      </div>
      {bookOnline === 'Specific Groups Only' &&
        <div className="group-type-allowed">
          <select>
            <option>Active Member</option>
            <option>Inactive Member</option>
          </select>
          <select>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      }
      <div className="age-restrictions">
        <label>Age Restriction</label>
        <RadioButtons 
          labels={['Open to all ages', 'Restricted to certain ages']}
          values={['All Ages', 'Age Restricted']}
          icons={[faUsers, faUsersSlash]}
          selectedValue={ageRestriction}
          setSelectedValue={setAgeRestriction}
        />
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
            {instructorOptions.map(instructor => (
              <option key={instructor}>{instructor}</option>
            ))}
          </select>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default NewClassForm;
