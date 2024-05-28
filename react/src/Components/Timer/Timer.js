import React, { useState, useEffect } from 'react';

import './Timer.css';

const Timer = () => {
  const [selectedMonth, setSelectedMonth] = useState(localStorage.getItem('selectedMonth') || '');
  const [selectedDay, setSelectedDay] = useState(localStorage.getItem('selectedDay') || '');
  const [selectedHour, setSelectedHour] = useState(localStorage.getItem('selectedHour') || '');

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    localStorage.setItem('selectedMonth', selectedMonth);
    localStorage.setItem('selectedDay', selectedDay);
    localStorage.setItem('selectedHour', selectedHour);
  }, [selectedMonth, selectedDay, selectedHour]);

  const calculateTimeLeft = () => {
    const targetDate = new Date();
    targetDate.setMonth(months.indexOf(selectedMonth));
    targetDate.setDate(selectedDay);
    targetDate.setHours(selectedHour);
    targetDate.setMinutes(0);
    targetDate.setSeconds(0);

    const difference = targetDate.getTime() - Date.now();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className="countdown-timer">
      <div className="time-fields">
        <div>
          <label>Mes:</label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Día:</label>
          <select value={selectedDay} onChange={(e) => setSelectedDay(parseInt(e.target.value))}>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Hora:</label>
          <select value={selectedHour} onChange={(e) => setSelectedHour(parseInt(e.target.value))}>
            {hours.map((hour) => (
              <option key={hour} value={hour}>{formatTime(hour)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="time-fields">
        <p className="days">
          <span>D</span> <span>{formatTime(timeLeft.days)}</span>
        </p>

        <p className="hours">
          <span>H</span> <span>{formatTime(timeLeft.hours)}</span>
        </p>

        <p className="minutes">
          <span>M</span> <span>{formatTime(timeLeft.minutes)}</span>
        </p>

        <p className="seconds">
          <span>S</span> <span>{formatTime(timeLeft.seconds)}</span>
        </p>
      </div>
    </div>
  );
};

export default Timer;
