import "./App.css";
import piggypayTitle from "./Images/piggypay.png";

function App() {
  return (
    <div>
      <div className="banner">
        <img src={piggypayTitle} alt="piggypay"></img>
      </div>
      <div className="background">
        <div className="content">
          <div className="output">
            <h2>You have earned</h2>
            <h1>£5.52</h1>
            <h2>since 09:04</h2>
          </div>
          <div className="input">
            <p>Picture of pig goes here</p>
            <p>Time started:</p>
            <p>Salary:</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
