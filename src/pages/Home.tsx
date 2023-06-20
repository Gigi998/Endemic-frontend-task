import { useEffect, useMemo } from 'react';
import { useCryptoContext } from '../context/appContext';
import Table from '../components/Table';
import { useColumns } from '../hooks/columns';

const Home = () => {
  const { columns } = useColumns();
  const { loading, trendingCrypto, pageIndex, pageSize, setSearchTerm } = useCryptoContext();

  const initState = {
    pageSize: pageSize,
    pageIndex: pageIndex,
  };

  const data = useMemo(() => [...trendingCrypto], [trendingCrypto]);
  const initialState = useMemo(() => initState, [initState]);

  useEffect(() => {
    setSearchTerm('');
  }, [setSearchTerm]);

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
