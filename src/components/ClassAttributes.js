// All attributes and functions that are common between
// NewClassForm and ClassDetails

export const colorOptions = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Cyan', hex: '#00FFFF' },
    { name: 'Grey', hex: '#B4C7DD' },
  ];
  
  export const classTimeOptions = [
    "8:00 AM", "8:15 AM", "8:30 AM", "8:45 AM",
    "9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM",
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
    "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
    "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM",
    "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
    "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM",
    "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM",
    "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM",
    "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM",
    "8:00 PM", "8:15 PM", "8:30 PM", "8:45 PM",
    "9:00 PM"
  ];
  
  export const classDurationOptions = [
    "30 min", "45 min", "60 min", "1 hr 15 min", 
    "1 hr 30 min", "1 hr 45 min", "2 hr", 
    "2 hr 15 min", "2 hr 30 min"
  ];

  export const purchaseOptions = [
    'Child (Age 5-10) Boxing Membership',
    'Two Month Beginner Bronze Membership',
    'Advanced/Fighter - Loyalty Membership',
    'Advanced/Fighter - Gold Gloves Membership'
  ];

  export const instructorOptions = [
    'Oneal Mendoza', 'Sandeep Mendoza',
    'Michael Viloria', 'Terrence Viloria', 'Angelo Viloria',
    'Naseem Bains', 'Iain Small', 'Alvin Valle'
  ];

  export const toggleColorPicker = (showColorPicker, setShowColorPicker) => {
    setShowColorPicker(!showColorPicker);
  };
  
  // Color Picker Functions
  export const handleColorChange = (color, setCalendarColor) => {
    setCalendarColor(color.hex);
  };
  
  export const handleColorChangePicker = (color, setTempColor) => {
    setTempColor(color.hex);
  };
  
  export const handleColorSave = (tempColor, setCalendarColor, setShowColorPicker) => {
    setCalendarColor(tempColor);
    setShowColorPicker(false);
  };
  
  export const handleColorCancel = (calendarColor, setTempColor, setShowColorPicker) => {
    setTempColor(calendarColor);
    setShowColorPicker(false);
  };  
  
  // Time Calculation Functions
  export const timeStrTo24HourFormat = (timeStr) => {
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
  
  export const timeTo12HourFormat = (datetime) => {
    const hour24 = datetime.getHours();
    const min = datetime.getMinutes();
    const mod = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;
    return [hour12, min, mod];
  };
  
  export const calculateDurationMinutes = (duration) => {
    const durationParts = duration.split(' ');
    let totalMin = 0;
    for (let i = 0; i < durationParts.length; i += 2) {
      if (durationParts[i + 1] === 'hr') {
        totalMin += parseInt(durationParts[i]) * 60;
      } else if (durationParts[i + 1] === 'min') {
        totalMin += parseInt(durationParts[i]);
      }
    }
    return totalMin;
  };
  
  export const calculateEndTime = (startTime, duration) => {
    const totalMin = calculateDurationMinutes(duration);
    const endTime = new Date(startTime.setMinutes(startTime.getMinutes() + totalMin));
    const [endHour12, endMin, endMod] = timeTo12HourFormat(endTime);
    return [`${endHour12.toString()}:${endMin.toString().padStart(2, '0')} ${endMod}`, endTime, endTime.getHours(), endHour12, endMin, endMod];
  };
  