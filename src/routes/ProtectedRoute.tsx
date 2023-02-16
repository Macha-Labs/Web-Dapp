import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/router";
import React from "react";

export const ProtectRoute = ({ children, routeName }: any) => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);

  const isLoggedIn = authContext.isConnected();

  if (isLoggedIn && window.location.pathname === "/") {
    router.push(routeName);
  } else if (!isLoggedIn && window.location.pathname !== "/") {
    router.push("/");
  }

  return children;
};
