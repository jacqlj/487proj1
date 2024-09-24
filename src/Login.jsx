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
          <input type="number" className="form-control form-control-lg" id="id" placeholder="1234" />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-lg btn-primary">
            Confirm
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
