import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function PrivateRoute({ allowedRoles }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Loader/>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-12 h-12">
        <div className="absolute w-full h-full rounded-full border-4 border-sky-300 border-t-sky-600 animate-spin"></div>
      </div>
    </div>
  );
};
