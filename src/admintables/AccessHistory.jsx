import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore';

function AccessHistory(props) {
  const [users, setUsers] = useState(null);
  const [idFilter, setIDFilter] = useState(null);
  const [dtFilterType, setDTFilterType] = useState(null);
  const [dtStart, setDTStart] = useState(null);
  const [dtEnd, setDTEnd] = useState(null);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const start = dtFilterType === 'date' ? Date.parse(dtStart) : null;
      const end = dtFilterType === 'date' ? Date.parse(dtEnd) + 864e5 : null;
      if (start && end && start > end) return;
      const coll = collection(props.db, 'accesshistory');
      const whereID = where('id', '==', +idFilter);
      const whereMillisStart = start ? where('timestamp', '>=', Timestamp.fromMillis(start)) : null;
      const whereMillisEnd = end ? where('timestamp', '<', Timestamp.fromMillis(end)) : null;
      const orderByTimeDesc = orderBy('timestamp', 'desc');
      const q =
        idFilter && dtFilterType === 'date'
          ? query(coll, whereID, whereMillisStart, whereMillisEnd, orderByTimeDesc)
          : !idFilter && dtFilterType === 'date'
          ? query(coll, whereMillisStart, whereMillisEnd, orderByTimeDesc)
          : idFilter && dtFilterType !== 'date'
          ? query(coll, whereID, orderByTimeDesc)
          : query(coll, orderByTimeDesc);
      // - !idFilter && !dtFilterType || !idFilter && dtFilterType === 'time'
      const querySnapshot = await getDocs(q);
      let users = [];
      querySnapshot.forEach((d) => {
        if (dtFilterType !== 'time') return users.push(d.data());
        const [sH, sM] = dtStart.split(':');
        const [eH, eM] = dtEnd.split(':');
        const dH = d.data().timestamp.toDate().getUTCHours();
        const dM = d.data().timestamp.toDate().getUTCMinutes();
        const dd = dH * 60 + dM;
        if (+sH * 60 + +sM <= dd && dd <= +eH * 60 + +eM) users.push(d.data());
      });
      setUsers(users);
      setFilter(false);
      console.log('fetching');
    };

    fetch().catch((e) => console.log(e));
  }, [filter]);

  const onIDFilterInputChange = (e) => setIDFilter(e.target.value);
  const onIDFilterInputClear = (_) => {
    setIDFilter(null);
    document.getElementById('id').value = null;
    setFilter(true);
  };
  const onDTFilterTypeClick = (e) => {
    setDTFilterType(e.target.value);
    setDTStart(null);
    setDTEnd(null);
    document.getElementById('end').value = null;
    document.getElementById('start').value = null;
  };
  const onDTStartChange = (e) => setDTStart(e.target.value);
  const onDTEndChange = (e) => setDTEnd(e.target.value);
  const onDTFilterClear = (_) => {
    setDTFilterType(null);
    setDTStart(null);
    setDTEnd(null);
    document.getElementById('start').value = null;
    document.getElementById('end').value = null;
    let els = document.getElementsByName('filter-type');
    els[0].checked = false;
    els[1].checked = false;
    setFilter(true);
  };
  const onFilterClick = (_) => setFilter(true);

  return (
    <>
      <div className="row align-items-center justify-content-center" style={{ marginBottom: '1em' }}>
        <div className="col-auto">
          <form
            className="row align-items-center justify-content-center"
            style={{ marginBottom: '0em', width: '45em' }}
          >
            <div className="col-auto">
              <label htmlFor="id" className="col-form-label">
                Filter by Access ID
              </label>
            </div>
            <div className="col-auto">
              <input
                type="number"
                className="form-control form-control-sm"
                id="id"
                placeholder="12345"
                onChange={onIDFilterInputChange}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-sm btn-danger" type="button" onClick={onIDFilterInputClear}>
                Clear
              </button>
            </div>
          </form>

          <form
            className="row align-items-center justify-content-center"
            style={{ marginBottom: '0em', width: '45em' }}
          >
            <div className="col-auto">
              <label htmlFor="filter-type" className="col-form-label">
                Filter by
              </label>
            </div>
            <div className="col-auto btn-group" role="group">
              <input
                type="radio"
                className="btn-check"
                name="filter-type"
                id="date"
                value="date"
                onClick={onDTFilterTypeClick}
              />
              <label className="btn btn-sm btn-outline-primary" htmlFor="date">
                Date
              </label>
              <input
                type="radio"
                className="btn-check"
                name="filter-type"
                id="time"
                value="time"
                onClick={onDTFilterTypeClick}
              />
              <label className="btn btn-sm btn-outline-primary" htmlFor="time">
                Time
              </label>
            </div>
            <div className="col-auto">
              <label htmlFor="start" className="col-form-label">
                from
              </label>
            </div>
            <div className="col-md">
              <input
                type={dtFilterType}
                className="form-control form-control-sm"
                id="start"
                disabled={!dtFilterType}
                onChange={onDTStartChange}
              />
            </div>
            <div className="col-auto">
              <label htmlFor="end" className="col-form-label">
                to
              </label>
            </div>
            <div className="col-md">
              <input
                type={dtFilterType}
                className="form-control form-control-sm"
                id="end"
                disabled={!dtFilterType}
                onChange={onDTEndChange}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-sm btn-danger" type="button" onClick={onDTFilterClear}>
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className="col-auto">
          <button className="btn btn-sm btn-primary" type="button" onClick={onFilterClick}>
            Filter
          </button>
        </div>
      </div>

      <div style={{ maxHeight: '20em', overflowY: 'scroll' }}>
        <table className="table table-secondary table-striped table-hover">
          <colgroup>
            <col span="1" style={{ width: '18em' }} />
            <col span="1" style={{ width: '7em' }} />
            <col span="1" style={{ width: '14em' }} />
            <col span="1" style={{ width: '7em' }} />
          </colgroup>

          <thead className="sticky-top table-dark">
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Access ID</th>
              <th scope="col">Name</th>
              <th scope="col">ID Type</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((u) => (
                <tr key={u.timestamp.nanoseconds}>
                  <th scope="row">{u.timestamp.toDate().toUTCString()}</th>
                  <td>{u.id}</td>
                  <td className="text-start">{u.name}</td>
                  <td>{u.type}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AccessHistory;
