import { useMemo } from 'react';
import { CustomColumn } from '../types/trendingCrypto';

export const useColumns = () => {
  const columns: CustomColumn[] = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'large',
        Cell: ({ value }: { value: string | undefined }) => (
          <img src={value} alt="Img" style={{ width: '50px' }} className="rounded-xl" />
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'Market Cap Rank',
        accessor: 'market_cap_rank',
      },
      {
        Header: 'Price To Btc',
        accessor: 'price_btc',
        isVisible: false,
      },
      {
        Header: 'InFavorites',
        accessor: 'isFavorites',
      },
    ],
    []
  );
  return { columns };
};
