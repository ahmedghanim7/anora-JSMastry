import { showToastError } from "@/utils";
import { useEffect, useState } from "react";

interface UseFetchDataProps {
  func: () => Promise<void>;
}
export const useFetchData = ({ func }: UseFetchDataProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      await func();
    } catch (err: any) {
      setError(err);
      showToastError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  const refresh = async () => {
    try {
      setIsRefreshing(true);
      await func();
    } catch (err: any) {
      setError(err);
      showToastError(err.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { refresh, isFetching, isRefreshing, error };
};
