import { CALENDAR_CONFIG } from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import Schedule from './components/Schedule';
import './scss/index.scss';

const mockData = require('../__tests__/mock.json');

function fetchData () {
  if (process.env.NODE_ENV !== 'production') {
    return Promise.resolve(mockData);
  }

  const { apiKey, calendarId } = CALENDAR_CONFIG;
  const url = encodeURI(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`);

  return fetch(url).then((r) => r.json());
}

class ScheduleManager {
  constructor(url, selector = '#schedule') {
    fetchData(url).then(data => {
      ReactDOM.render(
        <Store data={data}>
          {store => <Schedule store={store} />}
        </Store>,
        document.querySelector(selector)
      );
    });
  }
}

export default ScheduleManager;
