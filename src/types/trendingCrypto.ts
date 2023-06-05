import { ReactNode } from 'react';
import { Column, TableState } from 'react-table';

export type CryptoType = {
  coin_id?: number | undefined;
  name?: string;
  symbol?: string;
  market_cap_rank?: number;
  large?: string;
  price_btc?: number;
  isFavorites?: string;
};

export type LinksType = {
  id: number;
  icon: ReactNode;
  url: string;
};

export type ColumnType = {
  name?: string;
  symbol?: string;
  market_cap_rank?: number;
  large?: string;
  price_btc?: number;
  isFavorites?: string;
};

export type CustomColumn = Column<ColumnType> & {
  Cell?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  isVisible?: boolean;
};

export type InitStateProp = TableState<ColumnType> & {
  pageSize: number;
  pageIndex: number;
};
