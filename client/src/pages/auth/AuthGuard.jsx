

import { Navigate } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState"; // Custom hook

function AuthGuard({ children }) {
  const user = useAuthState();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default AuthGuard;
