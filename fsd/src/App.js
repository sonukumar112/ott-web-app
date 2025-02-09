import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>OTT Platform</h1>
          <nav className="App-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Add Movie
            </NavLink>
          </nav>
        </header>
        <main className="App-content">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/edit/:id" element={<EditMovie />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>© 2024 OTT Platform | All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
