// components/Shared/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../../features/auth/authSlice';

const ProtectedRoute = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />
  }

  return children;
};

export default ProtectedRoute;