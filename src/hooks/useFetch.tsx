import { useState, useEffect } from "react";
import axios from "axios";

// Tipado del hook
type UseFetch<T> = {
  data: T | null;
  loading: boolean;
};

const useFetch = <T,>(url: string): UseFetch<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
};

export default useFetch;

