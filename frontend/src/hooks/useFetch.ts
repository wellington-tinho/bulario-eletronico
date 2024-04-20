import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useFetch<T = unknown>(url: string, keyToCache: string) {
  return useQuery<T>({
    queryKey: [keyToCache],
    queryFn: () => api.get(url).then((res) => res.data),
    staleTime: 1000 * 60 * 30, // set the cache to 30 minutes
  });
}
