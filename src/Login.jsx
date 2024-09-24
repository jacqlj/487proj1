import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import './Login.css';

function Login(props) {
  const [clicked, setClicked] = useState(false);
  const [id, setID] = useState(null);
  const [idInput, setIDInput] = useState(null);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkID = async () => {
      const i = id;
      setID(null);
      const d = await getDoc(doc(props.db, 'user', '' + i));
      // validate login
      if (!d.exists()) return setErr('Invalid ID');
      if (d.data().status !== 'active') return setErr('ID is deactivated');
      setSuccess(true);
      setDoc(doc(props.db, 'accesshistory', '' + Date.now()), {
        timestamp: Timestamp.fromMillis(Date.now()),
        id: +i,
        name: d.data().name,
        type: d.data().type,
      });
      setTimeout(() => setSuccess(false), 3000);
    };

    id && checkID();
    setClicked(false);
  }, [id, clicked]);

  const handleLogin = () => {
    setClicked(true);
    if (!idInput) {
      setClicked(false);
      setErr('ID cannot be empty');
      return;
    }
    setID(idInput);
  };

  return (
    <>
      <form className="row align-items-center" style={{ marginTop: '2em' }}>
        <div className="col-auto">
          <label htmlFor="id" className="col-form-label fs-4">
            Access ID
          </label>
        </div>
        <div className="col-auto">
          <input
            type="number"
            className="form-control form-control-lg"
            id="id"
            placeholder="12345"
            onChange={(e) => {
              setIDInput(e.target.value);
              err && setErr(null);
            }}
          />
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-lg btn-primary" onClick={handleLogin}>
            Confirm
          </button>
        </div>
      </form>
      <div
        className={'alert fs-4 alert-' + (err ? 'danger fw-bold' : 'success')}
        style={{ marginTop: '1em', marginBottom: 0, visibility: err || success ? 'visible' : 'hidden' }}
        data-bs-theme="dark"
        role="alert"
      >
        {err ?? 'Welcome to SUN Lab'}
      </div>
    </>
  );
}

export default Login;
