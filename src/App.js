import "./App.css";
import piggypayTitle from "./Images/piggypay.png";
import piggyGif from "./Images/piggyGIF5.gif";
import errorSymbol from "./Images/warning.png";
import { useState, useEffect } from "react";
import buttonOink from "./Audio/oink.mp3";
import daddyOink from "./Audio/daddyOink.mp3";

function App() {
  const [startTime, setStartTime] = useState("");
  const [displayTime, setDisplayTime] = useState("");
  const [salary, setSalary] = useState();
  const [salaryOption, setSalaryOption] = useState("Per annum");
  const [time, setTime] = useState(new Date());
  const [totalEarned, setTotalEarned] = useState("0.00");
  const [frames, setFrames] = useState(0);
  const [mons, setMons] = useState(0);
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("Something went wrong.");

  const handleSetTime = (e) => {
    e.preventDefault();
    new Audio(buttonOink).play();
    if (isTimeValid()) {
      setDisplayTime(startTime);
      handleCalculation();
    } else {
      setErrorMsg("Please enter a time that is not in the future.");
      setError(true);
    }
  };

  const handleOinkOkay = (e) => {
    e.preventDefault();
    new Audio(buttonOink).play();
    setError(false);
  };

  const handleSetSalary = (e) => {
    e.preventDefault();
    new Audio(buttonOink).play();
    if (salary > 0) {
      handleCalculation();
    } else {
      setErrorMsg("Please enter a positive salary.");
      setError(true);
    }
  };

  const isTimeValid = () => {
    setTime(new Date());
    var currentHour = time.getHours();
    var currentMin = time.getMinutes();
    var currentSec = time.getSeconds();
    var startHour = parseInt(startTime.slice(0, 2));
    var startMin = parseInt(startTime.slice(3, 5));

    var minutesWorked = currentMin - startMin;
    var hoursWorked = currentHour - startHour;

    // Time should not be in the future
    if (hoursWorked > 0 || (hoursWorked === 0 && minutesWorked > 0)) {
      return true;
    } else {
      return false;
    }
  };

  const handleCalculation = () => {
    if (salary > 0 && displayTime !== "") {
      setTime(new Date());
      var currentHour = time.getHours();
      var currentMin = time.getMinutes();
      var currentSec = time.getSeconds();
      var startHour = parseInt(startTime.slice(0, 2));
      var startMin = parseInt(startTime.slice(3, 5));

      var salaryPerSecond;
      if (salaryOption === "Per annum") {
        salaryPerSecond = parseInt(salary) / (52 * 37.5 * 60 * 60);
      } else {
        salaryPerSecond = parseInt(salary) / 3600;
      }

      var minutesWorked = currentMin - startMin;
      var hoursWorked = currentHour - startHour;

      var totalSecsWorked =
        currentSec + 60 * minutesWorked + 3600 * hoursWorked;
      setMons(totalSecsWorked * salaryPerSecond);
      setTotalEarned((totalSecsWorked * salaryPerSecond).toFixed(2));
      var frameRate = 1000 / (salaryPerSecond * 100);
      setFrames(frameRate);
    } else {
      setFrames(0);
    }
  };

  const handleDaddyOink = (e) => {
    e.preventDefault();
    new Audio(daddyOink).play();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (frames > 0) {
        setMons(mons + 0.01);
      }
      setTotalEarned(mons.toFixed(2));
    }, frames);

    return () => clearInterval(interval);
  }, [frames, mons]);

  return (
    <div>
      {error && (
        <div className="backgroundOverlay">
          <div className="errorContainer">
            <div className="imgMsgContainer">
              <img src={errorSymbol} alt="redCross"></img>
              <p>{errorMsg}</p>
            </div>
            <div className="oinkButtonContainer">
              <button onClick={(e) => handleOinkOkay(e)}>Oink</button>
            </div>
          </div>
        </div>
      )}
      <div className="banner">
        <img src={piggypayTitle} alt="piggypay"></img>
      </div>
      <div className="background">
        <div className="content">
          <div className="output">
            <h2>You've earned</h2>
            <h1>£{totalEarned}</h1>
            {displayTime && <h2>since {displayTime}</h2>}
            {!displayTime && <h2>today! :(</h2>}
          </div>
          <div className="input">
            <img
              src={piggyGif}
              alt="Daddpiggybank"
              onClick={(e) => handleDaddyOink(e)}
            ></img>
            <form className="startTimeForm">
              <label htmlFor="startTime">Time started:</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <button onClick={(e) => handleSetTime(e)}>••</button>
            </form>
            <form className="salaryForm">
              <label htmlFor="salary">Salary:</label>
              <input
                type="number"
                pattern="[0-9]*"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <select
                id="salaryFrequency"
                name="salaryFrequency"
                value={salaryOption}
                onChange={(e) => setSalaryOption(e.target.value)}
              >
                <option value="yearly">Per annum</option>
                <option value="hourly">Per hour</option>
              </select>
              <button onClick={(e) => handleSetSalary(e)}>••</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
