import { useMemo } from 'react';

export const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'large',
        Cell: ({ value }: { value: string }) => (
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
        Header: 'Price To btc',
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
