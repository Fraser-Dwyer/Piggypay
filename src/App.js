import "./App.css";
import piggypayTitle from "./Images/piggypay.png";
import piggyGif from "./Images/piggyGIF5.gif";
import { useState } from "react";
import buttonOink from "./Audio/oink.mp3";
import daddyOink from "./Audio/daddyOink.mp3";

function App() {
  const [startTime, setStartTime] = useState("");
  const [displayTime, setDisplayTime] = useState("");
  const [salary, setSalary] = useState("");

  const handleSetTime = (e) => {
    e.preventDefault();
    setDisplayTime(startTime);
    new Audio(buttonOink).play();
  };

  const handleSetSalary = (e) => {
    e.preventDefault();
    // Work out seconds wage here
  };

  const handleDaddyOink = (e) => {
    e.preventDefault();
    new Audio(daddyOink).play();
  };

  return (
    <div>
      <div className="banner">
        <img src={piggypayTitle} alt="piggypay"></img>
      </div>
      <div className="background">
        <div className="content">
          <div className="output">
            <h2>You've earned</h2>
            <h1>£5.52</h1>
            <h2>since {displayTime}</h2>
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
            <form>
              <label htmlFor="salary">Salary:</label>
              <input
                type="number"
                pattern="[0-9]*"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <select id="salaryFrequency" name="salaryFrequency">
                <option value="hourly">Per hour</option>
                <option value="yearly">Per annum</option>
              </select>
              <button onClick={(e) => handleSetSalary(e)}>OK</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
