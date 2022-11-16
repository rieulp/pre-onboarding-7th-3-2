import { AccountsQuery, getPageAccounts } from 'api/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

function useAccountPage(InitialPage: number, query?: AccountsQuery) {
  const [page, setPage] = useState(InitialPage);
  const {
    data,
    fetchPreviousPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['accounts', query],
    queryFn: ({ pageParam = InitialPage }) => {
      return getPageAccounts({ ...query, _page: pageParam, _limit: 25 });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data && lastPage.data.length
        ? lastPage.cur_page + 1
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.cur_page === 1 ? undefined : firstPage.cur_page - 1;
    },
  });

  const nextPage = () => {
    if (!hasNextPage && data && data.pages.length - 1 > page) {
      setPage((prev) => prev + 1);
      return;
    }
    fetchNextPage().then(
      ({ hasNextPage }) => hasNextPage && setPage((prev) => prev + 1)
    );
  };

  const prevPage = () => {
    if (page === 1) return;
    fetchPreviousPage().then(() => {
      page > 1 && setPage((prev) => prev - 1);
    });
  };

  return {
    page,
    accountsData: data,
    prevPage,
    nextPage,
    isLoading,
    isError,
  };
}

export default useAccountPage;
