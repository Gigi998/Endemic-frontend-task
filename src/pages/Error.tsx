import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl text-slate-300">Sorry, page not found!</h2>
      <Link to="/" className="bg-slate-300 text-lg p-3 rounded-lg mt-5">
        Go to home
      </Link>
    </div>
  );
};

export default Error;
