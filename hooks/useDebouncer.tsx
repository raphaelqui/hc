/** @format */

import { useState, useEffect } from "react";

const useDebounce = (value: any, delay: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeoutId: any;

    const debounceFunction = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    };

    debounceFunction();

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
