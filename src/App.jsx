import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import './App.css';
import Admin from './Admin';
import Login from './Login';
import ToAdmin from './nav/ToAdmin';
import ToLogin from './nav/ToLogin';

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyB8Dsi7_0KMQuG-I51zDwyY7UWQylLH0aM',
    authDomain: 'jxl6891cs487wpj1.firebaseapp.com',
    projectId: 'jxl6891cs487wpj1',
    storageBucket: 'jxl6891cs487wpj1.appspot.com',
    messagingSenderId: '563448018929',
    appId: '1:563448018929:web:bc611f1b949100a8b43650',
    measurementId: 'G-3685CG9J53',
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  // for (let i = 0; i < 5; i++) {
  //   let id = Math.floor(Math.random() * 100000);
  //   setDoc(doc(db, 'user', id.toString()), {
  //     id: id,
  //     type: 'student',
  //     name: getRandomName(),
  //     status: 'active',
  //   });
  // }

  const login = (
    <>
      <div className="mid">
        <Login db={db} />
      </div>
      <div className="end">
        <ToAdmin />
      </div>
    </>
  );

  const admin = (
    <>
      <div className="mid">
        <Admin db={db} />
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
          <h3 className="display-5">SUN Lab Access</h3>
        </div>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route index element={login}></Route>
            <Route path="/admin" element={admin}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
