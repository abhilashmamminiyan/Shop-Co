import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  // Check if user is logged in
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role
  // Handle both array of strings or array of objects with role property
  const isAdmin = user.roles && (
    user.roles.includes('admin') || 
    user.roles.some(r => (typeof r === 'string' ? r === 'admin' : r.role === 'admin'))
  );

  if (!isAdmin) {
    // Redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
