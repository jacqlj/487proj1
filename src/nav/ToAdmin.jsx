import { useNavigate } from 'react-router-dom';

export default function ToAdmin() {
  const navigate = useNavigate();

  return (
    <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
      Admin functions
    </button>
  );
}
