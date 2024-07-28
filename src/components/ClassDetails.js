import React, { useState } from 'react';
import Select from 'react-select';
import '../assets/styles/Classes.css'

const ClassDetails = ({ course, updateClass, closeDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedClass, setUpdatedClass] = useState(course);

  const handleEdit = () => setIsEditing(true);
  
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedClass(course);
  };

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;

    if (name === 'limitReservations') {
      setUpdatedClass({
        ...updatedClass,
        reservationLimit: checked ? updatedClass.reservationLimit || '' : undefined,
        [name]: checked
      });
    } else if (name === 'reservationLimit') {
      setUpdatedClass({
        ...updatedClass,
        reservationLimit: value
      });
    } else {
      setUpdatedClass({
        ...updatedClass,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleColorChange = (selectedOption) => {
    setUpdatedClass({
      ...updatedClass,
      calendarColor: selectedOption.value
    });
  };

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
            <label>Title:</label>
            <input type="text" name="title" value={updatedClass.title} onChange={handleChange} disabled={!isEditing} readOnly={!isEditing} />
            <label>Days:</label><br />
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day}>
                <label>{day}</label>
                <input type="checkbox" name={day} checked={updatedClass[day]} onChange={handleChange} disabled={!isEditing} readOnly={!isEditing} /><br />
              </div>
            ))}
            <label>Time:</label>
            <select name="time" value={updatedClass.time} onChange={handleChange} disabled={!isEditing} readOnly={!isEditing}>
              <option disabled value="">--:--</option>
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
            <label>Length:</label>
            <select name="length" value={updatedClass.length} onChange={handleChange} disabled={!isEditing} readOnly={!isEditing}>
              <option disabled value="">---</option>
              <option>45 min</option>
              <option>60 min</option>
              <option>1 hr 15 min</option>
              <option>1 hr 30 min</option>
              <option>1 hr 45 min</option>
              <option>2 hr</option>
            </select>
            <label>Instructor:</label>
            <select name="instructor" value={updatedClass.instructor} onChange={handleChange} disabled={!isEditing} readOnly={!isEditing}>
              <option disabled value="">---</option>
              <option>Oneal Mendoza</option>
              <option>Sandeep Mendoza</option>
              <option>Michael Viloria</option>
              <option>Terrence Viloria</option>
              <option>Angelo Viloria</option>
              <option>Naseem Bains</option>
              <option>Iain Small</option>
              <option>Alvin Valle</option>
            </select>
            <label>Calendar Color:</label>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={colorOptions}
              value={colorOptions.find(option => option.value === updatedClass.calendarColor)}
              onChange={handleColorChange}
              formatOptionLabel={option => (
                <div className="color-option" data-color={option.color}>
                  {option.label}
                </div>
              )}
              isDisabled={!isEditing}
              readOnly={!isEditing}
            />
            <div>
              <label>Limit Number of Reservations
                <input type="checkbox" name="limitReservations" checked={updatedClass.reservationLimit !== undefined} onChange={handleChange} disabled={!isEditing} readOnly={!isEditing} />
              </label>
            </div>
            {updatedClass.reservationLimit !== undefined && (
              <div>
                <label>Reservation Limit:</label>
                <input type="text" name="reservationLimit" value={updatedClass.reservationLimit} onChange={handleChange} disabled={!isEditing} readOnly={!isEditing} />
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
