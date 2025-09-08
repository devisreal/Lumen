import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../types/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    toast.error("Please log in to continue.");
    return <Navigate to="/auth/login" replace />;
  }

  if (roles && !roles?.includes(user.role)) {
    toast.error("You don't access to view this page.");
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
