import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoading, selectUserId } from '../redux/user/selectors';

export default function RequireAuth({ children }) {
  let id = useSelector(selectUserId);
  let loading = useSelector(selectLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!id) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}
