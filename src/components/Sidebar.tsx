import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link
            to={url}
            key={id}
            className="flex text-3xl hover:bg-cyan-300 ease-in-out duration-500 active:bg-cyan-700 focus:bg-cyan-500 p-3 rounded-xl mt-5"
          >
            <h2>{icon}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
