import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="grid place-content-center bg-gray-100 bg-no-repeat bg-cover min-h-screen items-center before:absolute before:start-0 before:top-0 before:-z-20 before:size-full bg-[url('./assets/svg/hero-gradient.svg')]  before:bg-cover before:bg-center before:bg-no-repeat dark:bg-neutral-800 dark:before:bg-[url('https://preline.co/pro/assets/svg/component-dark/hero-gradient.svg')]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
