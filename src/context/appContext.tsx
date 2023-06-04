import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { CryptoType } from '../types/trendingCrypto';
import { trendingEndpoint, searchEndpoint } from '../helpers/urls';
import axios from 'axios';
import { getFromLocStor, saveFavToLocStor } from '../helpers/localStorage';

type CryptoContext = {
  trendingCrypto: CryptoType[];
  favoritesCrypto: CryptoType[];
  getTrendingCrypto: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  error: boolean;
  getSearchCrypto: (value: string) => void;
  pageSize: number;
  pageIndex: number;
  toggleFavorites: (id: string) => void;
  addToFavorites: (id: string) => void;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  updateCryptoFromFavorites: () => void;
  removeFromFav: (name: string) => void;
};

const CryptoContext = createContext({} as CryptoContext);

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [trendingCrypto, setTrendingCrypto] = useState<CryptoType[]>([]);
  const [favoritesCrypto, setFavoritesCrypto] = useState<CryptoType[]>(getFromLocStor());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [pageIndex, setPageIndex] = useState(0);

  // Fetch trending
  const getTrendingCrypto = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await axios.get(trendingEndpoint);
      setLoading(false);
      setTrendingCrypto(response.data.coins.map(i => i.item));
      addInFavoritesProperty();
      updateCryptoFromFavorites();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  // Search fetch
  const getSearchCrypto = async (value: string) => {
    setError(false);
    setLoading(true);
    try {
      const response = await axios.get(`${searchEndpoint}${value}`);
      setLoading(false);
      setTrendingCrypto(response.data.coins);
      addInFavoritesProperty();
      updateCryptoFromFavorites();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  // Add isFavorites property
  const addInFavoritesProperty = () => {
    setTrendingCrypto(prev => {
      return prev.map(obj => {
        return { ...obj, isFavorites: 'false' };
      });
    });
  };

  // ToggleFavoritesState
  const toggleFavorites = (name: string) => {
    setTrendingCrypto(prev => {
      return prev.map(obj => {
        if (obj.name === name) {
          return { ...obj, isFavorites: obj.isFavorites === 'false' ? 'true' : 'false' };
        }
        return obj;
      });
    });
  };

  // Add to fav array
  const addToFavorites = (name: string) => {
    const newObj = trendingCrypto.find(obj => obj.name === name);
    // Handle duplicates
    const newArr = favoritesCrypto.find(obj => obj.name === newObj.name);
    // Already added check
    if (newArr === undefined) {
      setFavoritesCrypto(prev => {
        return [...prev, { ...newObj, isFavorites: 'true' }];
      });
    }
    setFavoritesCrypto(prev => {
      return [...prev];
    });
  };

  // Remove from arr
  const removeFromFav = (name: string) => {
    const newArr = favoritesCrypto.filter(i => i.name !== name);
    setFavoritesCrypto(newArr);
  };

  // Update trending array after we get the data
  const updateCryptoFromFavorites = () => {
    setTrendingCrypto(prev => {
      return prev.map(obj2 => {
        const match = favoritesCrypto.find(obj1 => obj1.name === obj2.name);
        if (match) {
          return { ...obj2, isFavorites: 'true' };
        }
        return obj2;
      });
    });
  };

  // Fetch data based on search term
  useEffect(() => {
    searchTerm === '' ? getTrendingCrypto() : getSearchCrypto(searchTerm);
  }, [searchTerm]);

  // Save to loc storage
  useEffect(() => {
    saveFavToLocStor(favoritesCrypto);
  }, [favoritesCrypto]);

  return (
    <CryptoContext.Provider
      value={{
        trendingCrypto,
        getTrendingCrypto,
        error,
        loading,
        searchTerm,
        setSearchTerm,
        getSearchCrypto,
        pageIndex,
        pageSize,
        toggleFavorites,
        addToFavorites,
        favoritesCrypto,
        setPageIndex,
        updateCryptoFromFavorites,
        removeFromFav,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => {
  return useContext(CryptoContext);
};
