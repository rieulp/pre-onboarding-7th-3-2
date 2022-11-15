import React from 'react';
import Layout from 'components/Layout/dashboard';
import type { NextPageWithLayout } from 'pages/_app';

const DashBoard: NextPageWithLayout = () => {
  return <div></div>;
};

DashBoard.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default DashBoard;
