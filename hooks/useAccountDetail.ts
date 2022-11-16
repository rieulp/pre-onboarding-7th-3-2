import { useQuery } from '@tanstack/react-query';
import { getAccountDetail } from 'api/api';

function useAccountDetail(id?: string) {
  const { data, isLoading, isError } = useQuery(['account', id], () =>
    getAccountDetail(id)
  );
  return { accountDetailData: data, isLoading, isError };
}

export default useAccountDetail;
