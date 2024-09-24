import './Admin.css';

function Admin() {
  return (
    <>
      <div style={{ width: '50em', maxHeight: '20em' }}>
        <table width="100%" className="table table-dark table-striped table-hover">
          <colgroup>
            <col span="1" style={{ width: '15%' }} />
            <col span="1" style={{ width: '15%' }} />
            <col span="1" style={{ width: '40%' }} />
            <col span="1" style={{ width: '15%' }} />
            <col span="1" style={{ width: '15%' }} />
          </colgroup>

          <thead>
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Access ID</th>
              <th scope="col">Name</th>
              <th scope="col">ID Type</th>
              <th scope="col">ID Status</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default Admin;
