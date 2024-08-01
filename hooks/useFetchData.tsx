import { useEffect, useState } from "react";

interface UseFetchDataProps {
  func: () => Promise<void>;
}
export const useFetchData = ({ func }: UseFetchDataProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);
    await func();
    setIsFetching(false);
  };

  const refresh = async () => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { refresh, isFetching, isRefreshing };
};
