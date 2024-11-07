import { cookieKeys } from "@/utils/constants/common";
import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = (props: { component: React.ReactNode }) => {
  const token = Cookies.get(cookieKeys.token);
  return !!token ? props.component : <Navigate to="/auth" />;
};

export default ProtectedRouter;
