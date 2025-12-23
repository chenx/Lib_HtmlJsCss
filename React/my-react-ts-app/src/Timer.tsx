import { useState, useCallback, useEffect } from 'react'
import Menu from './Menu.tsx'
import './App.css'

// Needs to be out of functions to be global, so clearInterval works.
let cond = {
  intervalId: 0,
};

function calc(count: number) {
  // console.log('count = ', count);
  const ms = count % 100;
  const sec = ((count - ms) / 100) % 60;
  const min = (count - ms - sec * 100) / 6000;
  return  [min, sec, ms];
}

function Timer() {
  const [count, setCount] = useState(0);
  const [min, setMinute] = useState(0);
  const [sec, setSecond] = useState(0);
  const [ms, setMs] = useState(0);
  const [hideTotal, setHideTotal] = useState(true);
  

  const handleIncreaseButtonClick = (() => setCount(count => count + 1));

  const handleResetButtonClick = (() => {
    setCount(0);
    setMinute(0);
    setSecond(0);
    setMs(0);
    clearInterval(cond.intervalId);
  });

  const handleAutoIncreaseButtonClick = useCallback(() => {
    clearInterval(cond.intervalId);

    cond.intervalId = setInterval(() => {
      setCount(count => count + 1);
    }, 10);

    // Another way using ++ count, not recommended due to not concurrency safe.
    // cond.intervalId = setInterval(() => {
    //   // console.log('handleAutoIncreaseButtonClick ..');
    //   setCount(++ count);
    //   [min, sec, ms] = calc(count);
    //   console.log('count, sec / ms100 = ', count, sec, ms);
    //   setSecond(sec);
    //   setMs(ms);
    //   setMinute(min);
    // }, 10);
  }, [count]);

  const handleStopAutoIncreaseButtonClick = (() => {
    clearInterval(cond.intervalId);
  });

  const onChangeHideTotal = (() => {
    setHideTotal(! hideTotal);
  });

  useEffect(() => {
    const [minVal, secVal, msVal] = calc(count);
    // console.log('count, sec / ms100 = ', count, sec, ms);
    setSecond(secVal);
    setMs(msVal);
    setMinute(minVal);
  }, [count]);


  return (
    <>
      <div className="counter" hidden={hideTotal}>{count}</div>
      <div className="counter">{min < 10 ? '0' : ''}{min}:{sec < 10 ? '0' : ''}{sec}.{ms < 10 ? '0' : ''}{ms}</div>
      <button id="button" className="button" onClick={handleIncreaseButtonClick} style={{ display: 'none' }}>Increase</button>
      <button id="button2" className="button" onClick={handleAutoIncreaseButtonClick}>Start Auto Increase</button>
      <button id="button2" className="button" onClick={handleStopAutoIncreaseButtonClick}>Stop Auto Increase</button>
      <button id="button3" className="button" onClick={handleResetButtonClick}>Reset</button>
      <div>
        <input type="checkbox" id="checkbox" checked={hideTotal} className="setting" onChange={onChangeHideTotal} />Hide Total Count
      </div>
    </>
  );
}

function TimerApp() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Menu />
      <div className="App">
        <h1>Timer</h1>
        <Timer />
      </div>
    </>
  )
}

export default TimerApp
