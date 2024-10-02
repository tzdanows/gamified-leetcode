import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface RoleProtectedRouteProps {
    element: React.ReactNode;
    allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ element, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <>{element}</>; // Just return the component if access is granted
};

export default RoleProtectedRoute;
