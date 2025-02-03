import logo from './logo.svg';
import './App.css';
import RegisterOnClick from "./api/client";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    <label>pgaedgikedjfeikadaikr</label>

    <button onClick={() => console.log("help")}>Отправить запрос</button>
    <button onClick={RegisterOnClick}>Отправить запрос</button>
    </div>
  );
}

export default App;
