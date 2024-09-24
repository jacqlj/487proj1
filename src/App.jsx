import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import './App.css';
import Admin from './Admin';
import Login from './Login';
import ToAdmin from './nav/ToAdmin';
import ToLogin from './nav/ToLogin';
import getRandomName from './names';

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyAhZXo_oakesk6xD_-z76_f54gtKEOAu_s',
    authDomain: 'cs487proj1.firebaseapp.com',
    projectId: 'cs487proj1',
    storageBucket: 'cs487proj1.appspot.com',
    messagingSenderId: '3365516872',
    appId: '1:3365516872:web:5d389b173ccee5e4228a7d',
    measurementId: 'G-MYELQ69QSP',
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  // for (let i = 0; i < 1000; i++) {
  //   setDoc(doc(db, 'user', Math.floor(Math.random() * 100000).toString()), {
  //     type: 'student',
  //     name: getRandomName(),
  //   });
  // }

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
