import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const password = localStorage.getItem('admin-password');

  if (!password) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
