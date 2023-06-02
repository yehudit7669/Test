import React from "react";
import { Navigate } from "react-router-dom";
import { routes } from "../../constants";

type Props = {
  children: React.ReactNode;
};

const AuthRoute = ({ children }: Props) => {
  const isLoggedIn = true;

  if (isLoggedIn) return <>{children}</>;
  else return <Navigate to={routes.AUTH} />;
};
export default AuthRoute;
