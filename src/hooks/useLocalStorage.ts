"use client";
import { useState } from "react";

const useLocalStorage = (key: string, defaultValue: any) => {
  // Create state variable to store
  // localStorage value in state
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      console.log("key", key);

      const value = localStorage.getItem(key);
      console.log("value localstorage", value);

      // If value is already present in
      // localStorage then return it

      // Else set default value in
      // localStorage and then return it
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (valueOrFn: any) => {
    let newValue;
    if (typeof valueOrFn === "function") {
      const fn = valueOrFn;
      newValue = fn(localStorageValue);
    } else {
      newValue = valueOrFn;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
