import React, { useState } from 'react';
import CalendarModal from './CalendarModal';

const App = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventText, setEventText] = useState('');

  // Track viewed month/year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const days = [];
  const numDays = getDaysInMonth(currentMonth, currentYear);

  for (let i = 1; i <= numDays; i++) {
    days.push(new Date(currentYear, currentMonth, i));
  }

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setEventText(events[date.toDateString()] || '');
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    setEvents({ ...events, [selectedDate.toDateString()]: eventText });
    setShowModal(false);
    setEventText('');
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>House Sitting Calendar</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <button onClick={goToPreviousMonth} style={{ marginRight: '10px' }}>← Previous</button>
        <h2>{monthName} {currentYear}</h2>
        <button onClick={goToNextMonth} style={{ marginLeft: '10px' }}>Next →</button>
      </div>

      <div className="calendar">
        {days.map((day, idx) => (
          <div key={idx} className="day" onClick={() => handleDayClick(day)}>
            <strong>{day.getDate()}</strong>
            {events[day.toDateString()] && (
              <div className="event">{events[day.toDateString()]}</div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <CalendarModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
          eventText={eventText}
          setEventText={setEventText}
        />
      )}
    </div>
  );
};

export default App;
