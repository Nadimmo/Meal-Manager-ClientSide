import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../components/Hooks/useAdmin";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { isAdmin } = useAdmin();

  // 1️⃣ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 2️⃣ Authenticated → allow access
  if (user && isAdmin) {
    return children;
  }

  // 3️⃣ Not logged in → redirect
  return <Navigate to="/login" state={{ from: location }} replace />;

  
    
    
    
  
};

export default PrivateRoute;
