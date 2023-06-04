import { CryptoType } from '../types/trendingCrypto';

export const saveFavToLocStor = (items: CryptoType[]) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const getFromLocStor = () => {
  const result = localStorage.getItem('items');
  return result ? JSON.parse(result) : [];
};
