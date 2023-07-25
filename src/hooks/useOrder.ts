import { fetcher } from "@/utils/dataUtils";
import { SWR_RETRY_COUNT } from "../../public/config/constants";
import useSWR from "swr";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
export const useOrder = (
  enabled: boolean,
  baseUrl: string | undefined,
  order_id: string | undefined
) => {
  let isEnabled = false;
  if (enabled && baseUrl && order_id) {
    isEnabled = true;
  }

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<OrderWithItemsAndProducts>(
      isEnabled ? `${baseUrl}?orderId=${order_id}` : null,
      fetcher,
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
