import React, {useState, useEffect} from 'react';
import {PhotoshopPicker} from 'react-color';
import images from '../assets/images';
import '../assets/styles/Classes.css'
import '../assets/styles/Toolbar.css';
import ParagraphInput from '../components/ParagraphInput.js';
import ToggleButton from '../components/ToggleButton.js';
import {colorOptions, classTimeOptions, classDurationOptions, purchaseOptions, instructorOptions,
  toggleColorPicker, handleColorChange, handleColorChangePicker, handleColorSave, handleColorCancel, 
  timeStrTo24HourFormat, timeTo12HourFormat, calculateEndTime} from '../components/ClassAttributes.js';


const ClassDetails = ({ course, updateClass, closeDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedClass, setUpdatedClass] = useState(course);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [calendarColor, setCalendarColor] = useState(course.calendarColor);
  const [tempColor, setTempColor] = useState(course.tempColor);
  const [classIsActive, setClassIsActive] = useState(course.classIsActive);
  const [description, setDescription] = useState(course.description);

  const handleEdit = () => setIsEditing(true);
  
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedClass(course);
  };

  // Updates the class attributes whenever Calendar color, service category,  
  // or description value changes in edit mode
  useEffect(() => {
    setUpdatedClass(prevState => ({
      ...prevState,
      calendarColor,
      classIsActive,
      description
    }));
  }, [calendarColor, classIsActive, description]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUpdatedClass({...updatedClass, [name]: value});
  };

  const handleCheckBoxChange = (e) => {
    const {id, checked} = e.target;
    setUpdatedClass({...updatedClass, [id]: checked});
  };

  // Updates class's end time values based on new duration
  const handleDurationChange = (e) => {
    const {name, value} = e.target;
    const [newEndTimeStr, newEndDateTime, newEndHour24, newEndHour12, newEndMin, newEndTimeMod] = calculateEndTime(updatedClass.startDateTime, value);
    setUpdatedClass({...updatedClass,
      [name]: value,
      endTimeStr: newEndTimeStr,
      endDateTime: newEndDateTime,
      endHour24: newEndHour24,
      endHour12: newEndHour12,
      endMin: newEndMin,
      endTimeMod: newEndTimeMod
    });
  };

  // Updates class's start & end time integer, AM/PM and Date values
  const handleStartTimeChange = (e) => {
    const {name, value} = e.target;
    const [newStartHour24, newStartMin24] = timeStrTo24HourFormat(value);
    const newStartDateTime = new Date();
    newStartDateTime.setHours(parseInt(newStartHour24), parseInt(newStartMin24), 0, 0);
    const [newStartHour12, newStartMin, newStartTimeMod] = timeTo12HourFormat(newStartDateTime);
    const [newEndTimeStr, newEndDateTime, newEndHour24, newEndHour12, newEndMin, newEndTimeMod] = calculateEndTime(newStartDateTime, updatedClass.duration);
    
    setUpdatedClass({...updatedClass,
      [name]: value,
      startDateTime: newStartDateTime,
      startHour24: parseInt(newStartHour24),
      startHour12: newStartHour12,
      startMin: newStartMin,
      startTimeMod: newStartTimeMod,
      endTimeStr: newEndTimeStr,
      endDateTime: newEndDateTime,
      endHour24: newEndHour24,
      endHour12: newEndHour12,
      endMin: newEndMin,
      endTimeMod: newEndTimeMod
    });
  };

  const handleReservationLimitChange = (e) => {
    const {name, value, checked} = e.target;

    if (name === 'limitReservations') {
      setUpdatedClass({
        ...updatedClass,
        reservationLimit: checked ? updatedClass.reservationLimit || '' : undefined,
        [name]: checked
      });
    } else {
      setUpdatedClass({
        ...updatedClass,
        reservationLimit: value
      });
    } 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClass(updatedClass, course);
    setIsEditing(false);
    closeDetails();
  };

  return (
    <div>
        <h2>Class Details</h2>
        <form onSubmit={handleSubmit}>
            <label>Class Name:</label>
            <input type="text" name="title" value={updatedClass.title} onChange={handleInputChange} disabled={!isEditing} />
            <label>Service Category</label>
            <select 
              name="serviceCategory" 
              value={updatedClass.serviceCategory} 
              onChange={handleInputChange}
              disabled={!isEditing}>
                <option>Class</option>
                <option>Event</option>
            </select>
            <div className={`toggle-label ${classIsActive ? 'active' : ''}`}>
              {classIsActive ? 'ACTIVE CLASS' : 'INACTIVE CLASS'}
            </div>
            <ToggleButton isActive={classIsActive} setIsActive={setClassIsActive} />
            <ParagraphInput description={description} setDescription={setDescription} />
            <br/><br/><br/>
            <label>Class Schedule Days:</label><br/>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day}>
                <label>{day}</label>
                <input 
                  type="checkbox" 
                  id={day} 
                  checked={updatedClass[day]} 
                  onChange={handleCheckBoxChange} 
                  disabled={!isEditing} 
                /><br/>
              </div>
            ))}
            <label>Time:</label>
            <select name="startTimeStr" value={updatedClass.startTimeStr} onChange={handleStartTimeChange} disabled={!isEditing} readOnly={!isEditing}>
              <option selected disabled value="">--:--</option>
              {classTimeOptions.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
            <label>Length:</label>
            <select name="duration" value={updatedClass.duration} onChange={handleDurationChange} disabled={!isEditing} readOnly={!isEditing}>
              <option selected disabled value=""> --- </option>
              {classDurationOptions.map((duration) =>(
                <option key={duration}>{duration}</option>
              ))}
            </select>
            <label>Instructor:</label>
            <select name="instructor" value={updatedClass.instructor} onChange={handleInputChange} disabled={!isEditing} readOnly={!isEditing}>
              <option disabled value="">---</option>
              {instructorOptions.map(instructor => (
              <option key={instructor}>{instructor}</option>
              ))}
            </select>
            <label htmlFor="calendar-color-select">Calendar Color:</label> 
      <span>
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
      </span>
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
              <label>Limit Number of Reservations
                <input type="checkbox" name="limitReservations" checked={updatedClass.reservationLimit !== undefined} onChange={handleReservationLimitChange} disabled={!isEditing} readOnly={!isEditing} />
              </label>
            </div>
            {updatedClass.reservationLimit !== undefined && (
              <div>
                <label>Reservation Limit:</label>
                <input type="text" name="reservationLimit" value={updatedClass.reservationLimit} onChange={handleReservationLimitChange} disabled={!isEditing} readOnly={!isEditing} />
              </div>
            )}
            {isEditing && (
              <>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
              </>
            )}
            {!isEditing && (
              <button type="button" onClick={handleEdit}>Edit</button>
            )}
        </form>
    </div>
  )
};

export default ClassDetails;
