import { getToken } from 'lib/tokenStorage';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import Footer from '../footer';
import Header from './header';
import Sider from './sider';

interface LayoutProps {
  children: ReactNode;
}

const title: Record<string, string> = {
  '/dashboard': '대시보드',
  '/dashboard/account': '투자계좌',
  '/dashboard/user': '김핀트님의 계좌 목록',
};

function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const token = getToken();
  useEffect(() => {
    if (!token) router.replace('/login');
  }, [router, token]);

  const { asPath } = router;
  return (
    <div className="grid grid-cols-[250px_1fr]">
      <Sider />
      <div className="m-h-screen">
        <Header title={title[asPath] || ''} />
        <main className="bg-bg_grey min-h-[calc(100vh-96px)]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
