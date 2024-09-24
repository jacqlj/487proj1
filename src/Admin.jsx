import { useState } from 'react';
import AccessHistory from './admintables/AccessHistory';
import AccessPermissions from './admintables/AccessPermissions';
import UserList from './admintables/UserList';
import './Admin.css';

function Admin(props) {
  const db = props.db;
  const [pane, setPane] = useState('accesshistory');

  function getBtnClassName(s) {
    return 'btn btn-outline-light' + (pane === s ? ' active' : '');
  }

  return (
    <>
      <div className="admin-head">
        <div className="btn-group" role="group" aria-label="Table nav">
          <button type="button" className={getBtnClassName('accesshistory')} onClick={() => setPane('accesshistory')}>
            Access history
          </button>
          <button type="button" className={getBtnClassName('userlist')} onClick={() => setPane('userlist')}>
            User list
          </button>
          <button
            type="button"
            className={getBtnClassName('accesspermissions')}
            onClick={() => setPane('accesspermissions')}
          >
            Access permissions
          </button>
        </div>
      </div>
      {pane === 'accesshistory' ? (
        <AccessHistory db={db} />
      ) : pane === 'userlist' ? (
        <UserList db={db} />
      ) : pane === 'accesspermissions' ? (
        <AccessPermissions db={db} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Admin;
