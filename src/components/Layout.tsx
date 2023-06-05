import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="main-container flex rounded-xl border-8 border-slate-600 outline-offset-8">
      <Sidebar />
      <div className="flex-1 p-5">
        {location.pathname === '/' && <Navbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
