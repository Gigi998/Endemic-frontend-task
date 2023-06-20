import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const val: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(val);
    };
  }, [delay, value]);
  return debouncedValue;
};

export default useDebounce;
