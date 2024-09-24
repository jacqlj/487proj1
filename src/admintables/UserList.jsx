import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

function UserList(props) {
  const [users, setUsers] = useState(null);
  const [filter, setFilter] = useState(null);
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const q = filter
        ? query(collection(props.db, 'user'), where('id', '==', +filter))
        : query(collection(props.db, 'user'), orderBy('id'));
      const querySnapshot = await getDocs(q);
      let users = [];
      querySnapshot.forEach((d) => users.push(d.data()));
      setUsers(users);
      console.log('fetching');
    };

    fetch().catch((e) => console.log(e));
  }, [filter]);

  return (
    <>
      <form className="row align-items-center justify-content-center" style={{ marginBottom: '1em' }}>
        <div className="col-auto">
          <label htmlFor="id" className="col-form-label">
            Filter by Access ID
          </label>
        </div>
        <div className="col-auto">
          <input
            type="number"
            className="form-control"
            id="id"
            placeholder="12345"
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" type="button" onClick={() => setFilter(filterInput)}>
            Filter
          </button>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              setFilter(null);
              setFilterInput(null);
              document.getElementById('id').value = '';
            }}
          >
            Clear
          </button>
        </div>
      </form>

      <div style={{ maxHeight: '20em', overflowY: 'scroll' }}>
        <table className="table table-secondary table-striped table-hover">
          <colgroup>
            <col span="1" style={{ width: '7em' }} />
            <col span="1" style={{ width: '20em' }} />
            <col span="1" style={{ width: '7em' }} />
            <col span="1" style={{ width: '7em' }} />
          </colgroup>

          <thead className="sticky-top table-dark">
            <tr>
              <th scope="col">Access ID</th>
              <th scope="col">Name</th>
              <th scope="col">ID Type</th>
              <th scope="col">ID Status</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((u) => (
                <tr key={u.id}>
                  <th scope="row">{u.id}</th>
                  <td className="text-start">{u.name}</td>
                  <td>{u.type}</td>
                  <td>{u.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserList;
