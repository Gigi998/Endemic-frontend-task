import React, { useEffect, useMemo } from 'react';
import { useCryptoContext } from '../context/appContext';
import Table from '../components/Table';
import { useColumns } from '../hooks/columns';

const Favorite = () => {
  const { columns } = useColumns();
  const { favoritesCrypto, pageIndex, pageSize, setPageIndex } = useCryptoContext();

  // Set the index
  useEffect(() => {
    setPageIndex(Math.floor(favoritesCrypto.length / pageSize));
  }, [pageIndex]);

  const initState = {
    pageSize: pageSize,
    pageIndex: pageIndex,
  };

  const data = useMemo(() => [...favoritesCrypto], [favoritesCrypto]);
  const initialState = useMemo(() => initState, [initState]);

  return (
    <div className="flex flex-col items-center ">
      <h2 className="mt-2 text-3xl text-slate-300">Welcome to Fav page!</h2>
      {favoritesCrypto.length === 0 ? (
        <>
          <h2 className="mt-5 text-3xl text-slate-300">No items in favorites</h2>
        </>
      ) : (
        <Table data={data} columns={columns} initialState={initialState} />
      )}
    </div>
  );
};

export default Favorite;
