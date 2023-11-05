import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState();
  const [timer, setTimer] = useState(null);

  
  const formatTime = (seconds) => {

    if (time === 0) {
      playBell();
      setStatus(status === 'work' ? 'rest' : 'work'); // Toggle the status
      setTime(status === 'work' ? 12 : 15); 
    }

    const minutes = Math.floor(seconds / 60);
    const lastSec = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = lastSec < 10 ? `0${lastSec}` : lastSec;
    return `${formattedMinutes}:${formattedSeconds}`;
  };


  const startTimer = () => {
    setTime(15);
    setStatus('work');
    setTimer(setInterval(() => {
        setTime(time => time - 1);
    }, 1000))
  }

  const stopTimer = () => {
    setTime(0);
    setStatus('off');
    clearInterval(timer);
  }

  const closeApp = () => {
    window.close()
  }

 
  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };


  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && (<img src="./images/work.png" />)}
      { status === 'rest' && (<img src="./images/rest.png" />)}
      { status !== 'off' && (
        <div className="timer">
          {formatTime(time)}
        </div>
      )}
      { status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      { status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
