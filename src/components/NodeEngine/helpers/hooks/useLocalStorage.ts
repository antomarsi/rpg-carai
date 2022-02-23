import { useEffect, useState } from "react";

const getLocalStorageOrDefault = (key: string, defaultValue: any) => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
};

const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(
    getLocalStorageOrDefault(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
