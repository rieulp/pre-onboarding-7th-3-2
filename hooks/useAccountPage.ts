import { useQuery } from "@tanstack/react-query";
import { type AccountsQuery, getPageAccounts } from "lib/api/account";
import { useEffect, useState } from "react";

const LIMIT = 20;

function useAccountPage(InitialPage: number, query?: AccountsQuery) {
  const [page, setPage] = useState(InitialPage);
  const [maxPage, setMaxPage] = useState<number>();

  const { data, isError, isLoading } = useQuery(
    ["accounts", query, page],
    () => getPageAccounts({ ...query, _page: page, _limit: LIMIT }),
    {
      retry: 3,
      retryDelay: 3000,
    }
  );

  useEffect(() => {
    if (data && maxPage === undefined) {
      setMaxPage(Number(Math.ceil(data.totalCount / LIMIT)));
    }
  }, [data, maxPage]);

  useEffect(() => {
    setPage(1);
    setMaxPage(undefined);
  }, [query]);

  const nextPage = () => {
    if (maxPage && maxPage <= page) return;
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  return {
    page,
    setPage,
    maxPage,
    accountsData: data?.data,
    prevPage,
    nextPage,
    isLoading,
    isError,
  };
}
export default useAccountPage;
