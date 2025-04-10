import React from 'react';

const CalendarModal = ({ onClose, onSave, date, eventText, setEventText }) => {
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <h3>Add Event for {date.toDateString()}</h3>
        <input
          type="text"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Event details"
        />
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </>
  );
};

export default CalendarModal;
