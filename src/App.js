import React from "react"
import './App.css';
import '../src/fonts/stylesheet.css'
import PageNotFound from './pages/PageNotFound';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
/*import RegisterOnClick from "./api/client";*/

// Importing pages
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterForm from "./components/auth/models/RegisterModal";
import RegisteredNotification from "./components/auth/models/sub/RegisteredNotification";

// Блокируем WebSocket глобально
window.WebSocket = class MockSocket {
    constructor() {
        console.warn('WebSocket disabled');
    }
    send() {}
    close() {}
};

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route
                  path="/"
                  element={<Home />}
              ></Route>
              <Route path="*" element={ <PageNotFound/> } />
              <Route path="/auth" element={ <Login/> } />
              <Route path="/register" element={ <RegisterForm /> } />
              <Route path="/email_verify" element={ <RegisteredNotification/> }/>
            </Routes>
          </header>
          {/*<button onClick={RegisterOnClick}>Отправить запрос</button>*/}
        </div>
      </Router>
  );
}

export default App;
