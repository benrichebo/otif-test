import { useEffect, useMemo, useState } from "react";

export const useStorage = () => {
  const [data, setData] = useState();

  const localStorage = useMemo(() => {
    return {
      getItem(key) {
        if (typeof window !== "undefined") {
          const storage = window?.localStorage.getItem(key);
          if (storage) return JSON.parse(storage);
        }
      },

      setItem(key, value) {
        if (value)
          if (typeof window !== "undefined") {
            window?.localStorage.setItem(key, JSON.stringify(value));

            this.getItem(key);
          }
      },

      clearItem(key) {
        if (typeof window !== "undefined") {
          localStorage.clear(key);
          this.setItem(null);
          this.getItem(key);
        }
      },
    };
  }, []);

  //check if item exist
  useEffect(() => {
    const localData = localStorage.getItem();
    setData(localData);
  }, [localStorage]);

  return { data, localStorage };
};
