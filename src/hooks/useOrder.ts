import { fetcher } from "@/utils/dataUtils";
import { SWR_RETRY_COUNT } from "../../public/config/constants";
import useSWR from "swr";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";

export const useOrder = (
  enabled: boolean,
  baseUrl: string | undefined,
  orderId: string | undefined,
  accessToken?: string | undefined
) => {
  let isEnabled = false;
  if (enabled && baseUrl && orderId) {
    isEnabled = true;
  }

  const fetchWithToken = (url: string) => fetcher(url, accessToken);

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<OrderWithItemsAndProducts>(
      isEnabled ? `${baseUrl}?orderId=${orderId}` : null,
      fetchWithToken,
      {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (retryCount >= SWR_RETRY_COUNT) return;
          // Retry after 5 seconds.
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }
    );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
