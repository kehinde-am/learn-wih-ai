import React from "react";

const inDashboardLayout = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = true;

  return isAuthenticated ? <div>{children}</div> : <p>Again</p>;
};

export default inDashboardLayout;
