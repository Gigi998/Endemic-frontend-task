import React, { useEffect, useMemo } from 'react';
import { useCryptoContext } from '../context/appContext';
import Table from '../components/Table';
import { useColumns } from '../hooks/columns';

const Home = () => {
  const {
    getTrendingCrypto,
    loading,
    trendingCrypto,
    getSearchCrypto,
    searchTerm,
    pageIndex,
    pageSize,
  } = useCryptoContext();

  const { columns } = useColumns();

  const initState = {
    pageSize: pageSize,
    pageIndex: pageIndex,
  };

  useEffect(() => {
    if (searchTerm === '') {
      getTrendingCrypto();
    } else {
      getSearchCrypto(searchTerm);
    }
  }, [searchTerm]);

  const data = useMemo(() => [...trendingCrypto], [trendingCrypto]);
  const initialState = useMemo(() => initState, [initState]);

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl text-slate-300 mt-2">Welcome to Home page!</h2>
      <Table data={data} columns={columns} initialState={initialState} />
    </div>
  );
};

export default Home;
