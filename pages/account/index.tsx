import Layout from "components/Layout/dashboard/Layout";
import { NextPageWithLayout } from "pages/_app";
import React, { useState } from "react";
import { type AccountsQuery } from "lib/api/account";
import AccountsTable from "components/accountsTable";
import useAccountPage from "hooks/useAccountPage";
import Pagination from "components/pagination";
import AccountFilter from "components/AccountFilter";

const AccountsPage: NextPageWithLayout = () => {
  const [query, setQuery] = useState<AccountsQuery>({});
  const {
    page,
    accountsData,
    setPage,
    nextPage,
    prevPage,
    isError,
    isLoading,
    maxPage,
  } = useAccountPage(1, query);

  return (
    <div className="w-full">
      <div className="bg-white pb-2">
        <AccountFilter setQuery={setQuery} />
        <AccountsTable
          data={accountsData}
          isError={isError}
          isLoading={isLoading}
        />
        <Pagination
          page={page}
          maxPage={maxPage}
          onClickPage={setPage}
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
