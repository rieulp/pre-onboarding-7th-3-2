import { useQuery } from "@tanstack/react-query";
import { getAccountDetail } from "lib/api/account";

function useAccountDetail(id?: string) {
  const { data, isLoading, isError, refetch } = useQuery(
    ["account", id],
    () => getAccountDetail(id),
    { retry: 3, retryDelay: 3000 }
  );
  return { accountDetailData: data, isLoading, isError, refetch };
}

export default useAccountDetail;
