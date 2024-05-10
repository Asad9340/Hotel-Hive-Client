import { useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
function PrivateRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>
  }
  if (user) {
    return children;
  }
  return <Navigate to="/signin" state={location?.pathname} />;
}

export default PrivateRoute;
