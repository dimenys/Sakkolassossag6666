import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import './App.css';
import { SakkListPage } from "./SakkListPage";
import { SakkSinglePage } from "./SakkSinglePage";
import { SakkCreatePage } from "./SakkCreatePage";
import { SakkModPage } from "./SakkModPage";
import { SakkDeletePage } from "./SakkDeletePage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                Sakkok
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/uj-sakkok`} className="nav-link">
                Új Sakkok
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<SakkListPage />} />
        <Route path="/sakk/:sakkId" element={<SakkSinglePage />} />
        <Route path="uj-sakkok" element={<SakkCreatePage />} />
        <Route path="mod-sakk/:sakkId" element={<SakkModPage />} />
        <Route path="del-sakkok/:sakkId" element={<SakkDeletePage />} />
      </Routes>
    </Router>
  );
}


export default App;
