import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {PhotoshopPicker} from 'react-color';
import ParagraphInput from '../components/ParagraphInput.js';
import ToggleButton from '../components/ToggleButton.js';
import SelectableLists from '../components/SelectableLists.js';
import RadioButtons from '../components/RadioButtons.js';
import CheckTextInputList from '../components/CheckTextInputList.js';
import images from '../assets/images';
import '../assets/styles/Classes.css';
import {colorOptions, classTimeOptions, classDurationOptions, purchaseOptions, instructorOptions, classOptions,
        handleColorChange, toggleColorPicker, handleColorChangePicker, handleColorSave, handleColorCancel,
        timeStrTo24HourFormat, timeTo12HourFormat, calculateEndTime} from '../components/ClassAttributes.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandHoldingDollar, faFileInvoiceDollar, faCalendarXmark, faCalendarCheck, faUserLock,
        faCreditCard, faPersonCircleCheck, faCommentsDollar,
        faClipboardList, faSquareXmark, faUsers, faUsersSlash,
        faDollarSign, faEye, faEyeSlash,
        faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
const { ipcRenderer, remote } = window.require('electron');

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
  const [individualSessionCost, setIndividualSessionCost] = useState('35.00');
  const [individualCostVisibility, setIndividualCostVisibility] = useState(false);
  const [bookOnline, setBookOnline] = useState('');
  const [groupAllowedBooking, setGroupsAllowedBooking] = useState([]);
  const [purchaseTime, setPurchaseTime] = useState('');
  const [purchaseOptsVisible, setPurchaseOptsVisible] = useState('');
  const [ageRestriction, setAgeRestriction] = useState('');
  const [ageRestrictionType, setAgeRestrictionType] = useState('');
  const [ageRestricted, setAgeRestricted] = useState('');
  const [ageRestrictedVisible, setAgeRestrictedVisible] = useState(false);
  const [ageRestrictedRange, setAgeRestrictedRange] = useState(['', '']);
  const [availableOptions, setAvailableOptions] = useState([...purchaseOptions]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [classImage, setClassImage] = useState(null);
  const [hasPrequisites, setHasPrequisites] = useState('');
  const [prerequisites, setPrerequisites] = useState({});
  const [staffNotifications, setStaffNotifications] = useState(true);
  const [clientNotifications, setClientNotifications] = useState(true);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClassImage(reader.result); // Set the image data to state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAgeRestrictedChange = (index, value) => {
    const updatedAgeRestrictedRange = [...ageRestrictedRange];
    updatedAgeRestrictedRange[index] = value;
    setAgeRestrictedRange(updatedAgeRestrictedRange);
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
    const classData = {
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
      ageRestriction,
      ageRestrictionType,
      ageRestricted: ageRestrictionType === 'Age Range' ? ageRestrictedRange : ageRestricted,
      ageRestrictedVisible,
      hasPrequisites,
      prerequisites: hasPrequisites === 'Has Prerequisites' ? prerequisites : ({}),
      clientsBooked: 0, // manual update req'd
      waitlist: 0, // manual update req'd
      dateCreated: new Date(),
      lastEdited: new Date() // manual update req'd (TO DO onSubmit function in ClassDetails)
    };

    // Send class object data to ClassPage to be added to classes array with addClass function
    ipcRenderer.send('add-class', classData);
  };

  return (
    <form className="new-class-form" id="new-class-form" onSubmit={handleSubmit}>
      <h3>Create New Class</h3>
      <div className="form-layout-container">
        <div className="image-upload-container">
          {classImage ? (
            <img src={classImage} alt="Class" className="uploaded-image" />
          ) : (
            <label htmlFor="file-input" className="upload-placeholder">Upload Image</label>
          )}
          <input 
            className="file-input" 
            type="file" 
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange} />
        </div>
        <div className="form-fields-container">
          <div className="class-form-group">
            <label htmlFor="course-name">Class Name:</label><br/>
            <input type="text" name="course-name" className="class-form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div><br/>
          <div className="service-category-container">
            <label htmlFor="service-type">Service Category</label><br />
            <select name="service-type-select" value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} required>
              <option>Class</option>
              <option>Event</option>
            </select>
          </div>
        </div>
        <div className="active-class-container">
          <div className="active-class-toggle">
            <label className={`active-class-label ${classIsActive ? 'active' : ''}`}>
              {classIsActive ? 'ACTIVE CLASS' : 'INACTIVE CLASS'}
            </label>
            <ToggleButton isActive={classIsActive} setIsActive={setClassIsActive} />
          </div>
        </div>
      </div>
      <div>
        <label htmlForm="description">Description</label>
        <ParagraphInput description={description} setDescription={setDescription} />
      </div>
      <div>
        <label htmlForm="spec-description">Special Instructions</label><br/><br/>
        <div className="special-instructions-container">
          <ToggleButton isActive={specialInstructions} setIsActive={setSpecialInstructions} label="Only display special instructions to clients who have booked this class"/> 
        </div><br/>
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
        {individualSessions && 
          <div>
            <label>Cost Per Session: </label>&nbsp;&nbsp;
            <FontAwesomeIcon icon={faDollarSign} />&nbsp;
            <input type="text" value={individualSessionCost} onChange={(e) => setIndividualSessionCost(e.target.value)}/>
          </div>
        }
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
          icons={[faClipboardList, faSquareXmark]}
          selectedValue={purchaseOptsVisible}
          setSelectedValue={setPurchaseOptsVisible}
        />
      </div>
      <div className="purchase-cost-visibility">
        <RadioButtons
          labels={['Show individual session price during booking', 'Hide individidual sessions price']}
          values={['Show Individial Session Cost', 'Hide Individual Session Cost']}
          icons={[faEye, faEyeSlash]}
          selectedValue={individualCostVisibility}
          setSelectedValue={setIndividualCostVisibility}
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
        <div className="groups-allowed-booking">
          <div className="dropdown-container">
            <div className="dropdown-item">
              <label>Client Types</label><br/>
              <select>
                <option>Active Member</option>
                <option>Inactive Member</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label>Client Groups</label><br/>
              <select>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
        </div>
      }
      <div className="pre-requisites">
        <label>Prerequisites</label>
        <RadioButtons
          labels={['Select prerequisite services', 'No prerequisite services required']}
          values={['Has Prerequisites', 'No Prerequisites']}
          icons={[faLock, faLockOpen]}
          selectedValue={hasPrequisites}
          setSelectedValue={setHasPrequisites}
        />
        {hasPrequisites === 'Has Prerequisites' && 
          <div>
            <CheckTextInputList classOptions={classOptions} prerequisites={prerequisites} setPrerequisites={setPrerequisites} />
          </div>
        }
      </div>
      <div className="age-restrictions">
        <label>Age Restriction</label>
        <RadioButtons 
          labels={['Open to all ages', 'Restricted to certain ages']}
          values={['All Ages', 'Age Restricted']}
          icons={[faUsers, faUsersSlash]}
          selectedValue={ageRestriction}
          setSelectedValue={setAgeRestriction}
        />
        {ageRestriction === 'Age Restricted' && (
          <div>
            <label>Age Restriction Options:</label>&nbsp;
            <select value={ageRestrictionType} onChange={(e) => setAgeRestrictionType(e.target.value)} required>
              <option>Minimum Age</option>
              <option>Maximum Age</option>
              <option>Age Range</option>
            </select>
            &nbsp;&nbsp;
            {ageRestrictionType === 'Age Range' ? (
              <>
                <input type="text" className="small-input" value={ageRestrictedRange[0]} onChange={(e) => handleAgeRestrictedChange(0, e.target.value)} required />
                <label>to</label>&nbsp;
                <input type="text" className="small-input" value={ageRestrictedRange[1]} onChange={(e) => handleAgeRestrictedChange(1, e.target.value)} required />
                <label>y/o</label>
              </>
            ) : (
              <>
                <input 
                  type="text" 
                  className="small-input"
                  value={ageRestricted} 
                  onChange={(e) => setAgeRestricted(e.target.value)}
                  required />
                <label>y/o</label>
              </>
            )} 
            <div><br/>
              <ToggleButton isActive={ageRestrictedVisible} setIsActive={setAgeRestrictedVisible} label="Display service to clients who do not meet age requirement"/>
            </div>
          </div>
        )}
      </div><br/>
      <div className="notifications">
        <label>Notifications</label><br/><br/>
        <ToggleButton isActive={staffNotifications} setIsActive={setStaffNotifications} label="Staff Notifications" />
        <label><small>Staff with receieve all default notifications</small></label><br/><br/>
        <ToggleButton isActive={clientNotifications} setIsActive={setClientNotifications} label="Client Notifications" />
        <label><small>Clients will recieve all default notifications</small></label>
      </div><br/>
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
      <button type="submit">Save</button>
    </form>
  );
};

export default NewClassForm;
