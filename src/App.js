import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function App() {
  const [myEvents, setMyEvents] = useState([
    {
      title: 'Initial Event',
      allDay: true,
      start: new Date(),
      end: new Date(),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = {
        title,
        start,
        end,
        allDay: true,
      };
      setMyEvents(prev => [...prev, newEvent]);
    }
  };

  return (
    <div className="App" style={{ height: '100vh', padding: '20px' }}>
      <h2>🗓️ Shared Calendar</h2>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: '90vh' }}
      />
    </div>
  );
}

export default App;
