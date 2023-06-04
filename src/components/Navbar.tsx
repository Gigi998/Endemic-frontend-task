import React from 'react';
import { useCryptoContext } from '../context/appContext';

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useCryptoContext();

  return (
    <div className="h-1/12 flex justify-center">
      <form>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="outline-none rounded-lg p-2 bg-slate-300 w-80"
        />
      </form>
    </div>
  );
};

export default Navbar;
