import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = window.location.host.indexOf('localhost') >= 0
  ? 'http://127.0.0.1:5000'
  : window.location.host;

export default function Chatbox(props) {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // Changed to boolean
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    { name: 'Admin', body: 'Hello there! Please ask your question.' },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });

      socket.on('message', (data) => {
        setMessages((prevMessages) => [...prevMessages, { body: data.body, name: data.name }]);
      });

      return () => {
        socket.off('message');
      };
    }
  }, [socket, userInfo]);

  const supportHandler = () => {
    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
    }
    setIsOpen(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type a message.');
      return;
    }
    setMessages((prevMessages) => [...prevMessages, { body: messageBody, name: userInfo.name }]);
    setMessageBody('');
    setTimeout(() => {
      if (socket) {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }
    }, 1000);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className="chatbox">
      {!isOpen ? (
        <button type="button" onClick={supportHandler}>
          <i className="fa fa-support" />
        </button>
      ) : (
        <div className="card card-body">
          <div className="row">
            <strong>Support</strong>
            <button type="button" onClick={closeHandler}>
              <i className="fa fa-close" />
            </button>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{`${msg.name}: `}</strong> {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={submitHandler} className="row">
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                placeholder="type message"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
