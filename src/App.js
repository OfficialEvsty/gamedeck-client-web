import './App.css';
import PageNotFound from './pages/PageNotFound';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import RegisterOnClick from "./api/client";

// Importing pages
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
          </nav>
          <Routes>
            <Route
                path="/"
                element={<Home />}
                errorElement={<PageNotFound />}
            ></Route>
          </Routes>
        </header>
      <button onClick={RegisterOnClick}>Отправить запрос</button>
      </div>
    </Router>
  );
}

export default App;
