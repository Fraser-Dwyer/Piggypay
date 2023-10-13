import "./App.css";
import piggypayTitle from "./Images/piggypay.png";
import piggyGif from "./Images/piggyGIF5.gif";
import { useState, useEffect } from "react";
import buttonOink from "./Audio/oink.mp3";
import daddyOink from "./Audio/daddyOink.mp3";

function App() {
  const [startTime, setStartTime] = useState("");
  const [displayTime, setDisplayTime] = useState("");
  const [salary, setSalary] = useState("0");
  const [salaryOption, setSalaryOption] = useState("Per annum");
  const [time, setTime] = useState(new Date());

  const handleSetTime = (e) => {
    e.preventDefault();
    setDisplayTime(startTime);
    new Audio(buttonOink).play();
  };

  const handleSetSalary = (e) => {
    e.preventDefault();
    new Audio(buttonOink).play();
    var currentHour = time.getHours();
    var currentMin = time.getMinutes();
    var startHour = parseInt(startTime.slice(0, 2));
    var startMin = parseInt(startTime.slice(3, 5));
    var totalMinsWorked =
      60 - startMin + 60 * (currentHour - (startHour + 1)) + currentMin;
    console.log(totalMinsWorked);
    var salaryPerMin;
    if (salaryOption === "Per annum") {
      salaryPerMin = parseInt(salary) / (52 * 37.5 * 60);
    } else {
      salaryPerMin = parseInt(salary) / 60;
    }
    var totalMoneyEarned = salaryPerMin * totalMinsWorked;
    alert(totalMoneyEarned);
  };

  const handleDaddyOink = (e) => {
    e.preventDefault();
    new Audio(daddyOink).play();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
