import { useNavigate } from 'react-router-dom';

export default function ToLogin() {
  const navigate = useNavigate();

  return (
    <button className="btn btn-secondary" onClick={() => navigate('/')}>
      Back to login
    </button>
  );
}
