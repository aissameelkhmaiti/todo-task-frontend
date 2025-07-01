import React, { useEffect, useState } from 'react';
import echo from '../utils/echo';

const Notifications = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    echo.private('notifications')
      .listen('TaskCreated', (e) => {
        setMessages(prev => [...prev, e.message]);
      });
  }, []);

  return (
    <div>
      <h2>Notifications :</h2>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
    </div>
  );
};

export default Notifications;
