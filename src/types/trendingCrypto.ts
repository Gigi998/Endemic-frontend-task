import { ReactNode } from 'react';

export type CryptoType = {
  coin_id: number | undefined;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  price_btc: number;
  isFavorites: string;
};

export type LinksType = {
  id: number;
  icon: ReactNode;
  url: string;
};
