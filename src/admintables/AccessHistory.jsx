function AccessHistory() {
  return (
    <div style={{ maxHeight: '20em' }}>
      <table className="table table-dark table-striped table-hover">
        <colgroup>
          <col span="1" style={{ width: '12em' }} />
          <col span="1" style={{ width: '7em' }} />
          <col span="1" style={{ width: '20em' }} />
          <col span="1" style={{ width: '7em' }} />
        </colgroup>

        <thead>
          <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">Access ID</th>
            <th scope="col">Name</th>
            <th scope="col">ID Type</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default AccessHistory;
