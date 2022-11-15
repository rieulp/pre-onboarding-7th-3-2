import { AccountsQuery, getAccounts } from 'api/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function useAccounts(query?: AccountsQuery) {
  const [isEnd, setEnd] = useState(false);
  const { data, isLoading, isError, error } = useQuery(
    ['accounts', query],
    getAccounts(query)
  );

  useEffect(() => {
    if (data && data.length === 0 && !isEnd) setEnd(true);
  }, [data, isEnd]);

  return { accountsData: data, error, isLoading, isError, isEnd };
}

export default useAccounts;
