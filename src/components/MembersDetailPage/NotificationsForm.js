import React, { useState } from 'react';

const NotificationForm = () => {
  const [notifications, setNotifications] = useState({
    email: {
      scheduleReminders: false,
      accountManagement: false,
      newsUpdates: false,
    },
    sms: {
      scheduleReminders: false,
      accountManagement: false,
      newsUpdates: false,
    },
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const [type, key] = name.split('.');

    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Notifications settings:', notifications);
  };

  return (
    <form className="notification-form" onSubmit={handleSubmit}>
      <table className="table">
        <thead>
          <tr>
            <th>Notifications</th>
            <th>Email</th>
            <th>SMS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h5>Schedule and Reminders</h5>
              <p>Notifications related to schedules and bookings. Examples include booking confirmations and reminders.</p>
            </td>
            <td>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="emailScheduleReminders"
                  name="email.scheduleReminders"
                  checked={notifications.email.scheduleReminders}
                  onChange={handleChange}
                />
              </div>
            </td>
            <td>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="smsScheduleReminders"
                  name="sms.scheduleReminders"
                  checked={notifications.sms.scheduleReminders}
                  onChange={handleChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Account Management</h5>
              <p>Notifications related to account. Examples include membership renewal notifications and purchase receipts.</p>
            </td>
            <td>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="emailAccountManagement"
                  name="email.accountManagement"
                  checked={notifications.email.accountManagement}
                  onChange={handleChange}
                />
              </div>
            </td>
            <td>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="smsAccountManagement"
                  name="sms.accountManagement"
                  checked={notifications.sms.accountManagement}
                  onChange={handleChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <h5>News and Updates</h5>
              <p>Direct communication from the studio including promotional notifications, newsletters and special announcements.</p>
            </td>
            <td>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="emailNewsUpdates"
                  name="email.newsUpdates"
                  checked={notifications.email.newsUpdates}
                  onChange={handleChange}
                />
              </div>
            </td>
            <td>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="smsNewsUpdates"
                  name="sms.newsUpdates"
                  checked={notifications.sms.newsUpdates}
                  onChange={handleChange}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
    </form>
  );
};

export default NotificationForm;
