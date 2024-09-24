import './Login.css';

function Login() {
  return (
    <>
      <form className="row align-items-center">
        <div className="col-auto">
          <label htmlFor="id" className="col-form-label fs-4">
            Access ID
          </label>
        </div>
        <div className="col-auto">
          <input type="number" className="form-control form-control-lg" id="id" placeholder="12345" />
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-lg btn-primary">
            Confirm
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
