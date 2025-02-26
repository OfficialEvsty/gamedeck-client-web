import './App.css';
import PageNotFound from './pages/PageNotFound';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
/*import RegisterOnClick from "./api/client";*/

// Importing pages
import Home from './pages/Home';
import Login from './pages/Login';

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
              <Route path="/login" element={ <Login/> } />
            </Routes>
          </header>
          {/*<button onClick={RegisterOnClick}>Отправить запрос</button>*/}
        </div>
      </Router>
  );
}

export default App;
