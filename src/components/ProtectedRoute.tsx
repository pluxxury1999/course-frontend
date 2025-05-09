import { Navigate, Outlet } from "react-router-dom";

import React from "react";

const ProtectedRoute: React.FC = () => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate
            to="/login"
            replace
        />
    );
};

export default ProtectedRoute;