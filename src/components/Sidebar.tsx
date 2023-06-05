import React from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../helpers/sidebarLinks';
import { useCryptoContext } from '../context/appContext';

const Sidebar = () => {
  const { favoritesCrypto } = useCryptoContext();
  return (
    <div className="w-min p-3 bg-slate-900 rounded-l relative">
      <span className="absolute mt-24 ml-8 bg-red-500 w-5 h-5 rounded-lg flex items-center justify-center">
        {favoritesCrypto.length}
      </span>
      {links.map(link => {
        const { id, url, icon } = link;
        return (
          <NavLink
            to={url}
            key={id}
            className={({ isActive }) =>
              isActive ? 'sidebar-link bg-cyan-500' : 'sidebar-link  ease-in-out duration-500'
            }
          >
            <h2>{icon}</h2>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
