import { useEffect, useState } from "react";

const getSavedValue = (key, initValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) return savedValue;
  if (initValue instanceof Function) return initValue();
  return initValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => getSavedValue(key, initValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
