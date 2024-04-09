/** @format */

import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeoutId;

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
