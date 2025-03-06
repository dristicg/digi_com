

import { useSelector } from "react-redux";
import { useEffect } from "react";

const DebugAuth = () => {
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Auth State:", authState);
  }, [authState]); // Logs whenever authState changes

  return null; // This component does not render anything, only logs
};

export default DebugAuth;
