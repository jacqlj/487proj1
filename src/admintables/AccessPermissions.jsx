import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

function AccessPermissions(props) {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(props.db, 'accesspermissions'), where('type', '!=', ''));
      const querySnapshot = await getDocs(q);
      let rows = [];
      querySnapshot.forEach((d) => {
        let row = { type: d.data().type };
        d.data().accesstimes.forEach((t) => {
          row[t.day] = { start: t.starttime, end: t.endtime };
        });
        rows.push(row);
      });
      setRows(rows);
      console.log('fetching');
    };

    fetch().catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div style={{ maxHeight: '20em', overflowY: 'scroll' }}>
        <table className="table table-secondary table-striped table-hover">
          <colgroup>
            <col span="1" style={{ width: '8em' }} />
            <col span="1" style={{ width: '6em' }} />
            <col span="1" style={{ width: '6em' }} />
            <col span="1" style={{ width: '6em' }} />
            <col span="1" style={{ width: '6em' }} />
            <col span="1" style={{ width: '6em' }} />
            <col span="1" style={{ width: '6em' }} />
            <col span="1" style={{ width: '6em' }} />
          </colgroup>

          <thead className="sticky-top table-dark">
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Sun</th>
              <th scope="col">Mon</th>
              <th scope="col">Tue</th>
              <th scope="col">Wed</th>
              <th scope="col">Thu</th>
              <th scope="col">Fri</th>
              <th scope="col">Sat</th>
            </tr>
          </thead>

          <tbody>
            {rows &&
              rows.map((u) => (
                <tr key={u.type}>
                  <th scope="row">{u.type}</th>
                  <td>{u.sunday ? u.sunday.start + ' - ' + u.sunday.end : '---'}</td>
                  <td>{u.monday ? u.monday.start + ' - ' + u.monday.end : '---'}</td>
                  <td>{u.tuesday ? u.tuesday.start + ' - ' + u.tuesday.end : '---'}</td>
                  <td>{u.wednesday ? u.wednesday.start + ' - ' + u.wednesday.end : '---'}</td>
                  <td>{u.thursday ? u.thursday.start + ' - ' + u.thursday.end : '---'}</td>
                  <td>{u.friday ? u.friday.start + ' - ' + u.friday.end : '---'}</td>
                  <td>{u.saturday ? u.saturday.start + ' - ' + u.saturday.end : '---'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AccessPermissions;
