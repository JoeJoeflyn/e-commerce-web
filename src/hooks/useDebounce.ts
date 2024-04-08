import React from "react";

export default function useDebounce<T>(val: T, delay?: number): T {
  const [debounceVal, setDebounceVal] = React.useState<T>(val);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [val, delay]);

  return debounceVal;
}
