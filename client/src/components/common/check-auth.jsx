import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("Current Path:", location.pathname);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("User:", user);

  // Avoid redirect issues while checking auth state
  if (isAuthenticated === null || (isAuthenticated && !user?.role)) {
    return null; // Prevents flickering redirects
  }

  // If on the homepage
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      return user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />;
    }
  }

  // Restrict unauthenticated users from accessing protected routes
  if (!isAuthenticated && !location.pathname.includes("/auth/")) {
    return <Navigate to="/auth/login" />;
  }

  // Prevent logged-in users from accessing login/register pages
  if (isAuthenticated && location.pathname.includes("/auth/")) {
    return user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />;
  }

  // Prevent non-admin users from accessing admin pages
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Prevent admin users from accessing shop pages
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
