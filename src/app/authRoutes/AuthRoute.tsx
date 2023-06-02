import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AuthRoute = ({ children }: Props) => {
  const isLoggedIn = true;

  if (isLoggedIn) return <>{children}</>;
  else return <Navigate to={"/auth"} />;
};
export default AuthRoute;
