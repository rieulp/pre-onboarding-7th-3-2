import Layout from 'components/Layout/dashboard';
import { NextPageWithLayout } from 'pages/_app';
import React, { useEffect, useState } from 'react';
import { type AccountsQuery } from 'api/api';
import AccountsTable from 'components/accountsTable';
import useAccounts from 'hooks/useAccounts';
import Pagination from 'components/pagination';

const InvestAccount: NextPageWithLayout = (props) => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(-1);
  const [query, setQuery] = useState<AccountsQuery>({
    _page: page,
  });

  const { accountsData, isError, isLoading, isEnd } = useAccounts(query);

  useEffect(() => {
    // console.log(Router.query);
  }, []);

  useEffect(() => {
    setQuery({ _page: page });
  }, [page]);

  useEffect(() => {
    if (isEnd) {
      setMaxPage(page - 1);
      setPage((prev) => prev - 1);
    } // setPage((prev) => prev - 1);
  }, [isEnd]);

  if (isError) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="p-2">
      <div className="m-5 bg-white pb-2">
        <AccountsTable data={accountsData} />
        <Pagination
          page={page}
          maxPage={maxPage}
          onChangePage={(num) => setPage(num)}
        />
      </div>
    </div>
  );
};

export default InvestAccount;

InvestAccount.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
