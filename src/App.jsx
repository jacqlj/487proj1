import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Admin from './Admin';
import ToAdmin from './nav/ToAdmin';
import ToLogin from './nav/ToLogin';

function App() {
  const login = (
    <>
      <div className="mid">
        <Login />
      </div>
      <div className="end">
        <ToAdmin />
      </div>
    </>
  );

  const admin = (
    <>
      <div className="mid">
        <Admin />
      </div>
      <div className="end">
        <ToLogin />
      </div>
    </>
  );

  return (
    <>
      <div className="window">
        <div className="head">
          <h3 className="display-3">SUN Lab Access</h3>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={login}></Route>
            <Route path="/admin" element={admin}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
