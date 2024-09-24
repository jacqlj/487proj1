import './Admin.css';

function Admin() {
  return (
    <>
      <div style={{ width: '50em', maxHeight: '20em' }}>
        <table width="100%" className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Access ID</th>
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
