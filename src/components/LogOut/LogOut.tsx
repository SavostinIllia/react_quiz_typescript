import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/authcontext/Authcontext";

const LogOut: React.FC = () => {
  const { logOut } = useAuthContext();
  useEffect(() => {
    logOut();
  });
  return <Redirect to="/auth" />;
};
export default LogOut;
