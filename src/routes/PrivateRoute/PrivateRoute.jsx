import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';

function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();

  if (isLoggedIn) return <>{children}</>;
  return <Navigate to='/login' />;
}

export default PrivateRoute;
