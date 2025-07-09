import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return (
      <h1 className="text-center text-2xl mt-10 text-red-600">
        🚫 Access Denied
      </h1>
    );
  }

  return children;
}

export default ProtectedRoute;
