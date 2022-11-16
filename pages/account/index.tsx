import Layout from 'components/Layout/dashboard';
import { NextPageWithLayout } from 'pages/_app';
import React, { useState } from 'react';
import { type AccountsQuery } from 'api/api';
import AccountsTable from 'components/accountsTable';
import useAccountPage from 'hooks/useAccountPage';
import Pagination from 'components/pagination';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const AccountsPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const [maxPage, setMaxPage] = useState(-1);
  const [query, setQuery] = useState<AccountsQuery>({});

  const { data } = useQuery([router.query], (context) => {
    return context.queryKey;
  });

  const { page, accountsData, nextPage, prevPage, isError, isLoading } =
    useAccountPage(1, query);

  if (isError) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="p-2">
      <div className="m-5 bg-white pb-2">
        <AccountsTable data={accountsData?.pages[page - 1]?.data} />
        <Pagination
          page={page}
          maxPage={maxPage}
          onClickNext={nextPage}
          onClickPrev={prevPage}
        />
      </div>
    </div>
  );
};

export default AccountsPage;

AccountsPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
