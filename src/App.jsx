import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  return (
    <>
      <div className="window">
        <h3 className="display-3">SUN Lab Access</h3>
        <form className="row align-items-center">
          <div className="col-auto">
            <label for="id" className="col-form-label fs-4">
              Access ID
            </label>
          </div>
          <div className="col-auto">
            <input type="number" className="form-control form-control-lg" id="id" placeholder="1234"></input>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-lg btn-primary">
              Confirm
            </button>
          </div>
        </form>
        <button className="btn btn-secondary">Admin functions</button>
      </div>
    </>
  );
}

export default App;
