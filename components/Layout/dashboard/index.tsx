import { getToken } from 'lib/tokenStorage';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import Footer from '../footer';
import Header from './header';
import Sider from './sider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  children: ReactNode;
}

const title: Record<string, string> = {
  '/dashboard': '대시보드',
  '/account': '투자계좌',
  '/user': '김핀트님의 계좌 목록',
};

function Layout({ children }: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) router.replace('/');
  }, [router]);

  const { asPath } = router;
  return (
    <div className="grid grid-cols-[250px_1fr]">
      <Sider />
      <div className="m-h-screen">
        <Header title={title[asPath] || ''} />
        <main className="bg-bg_grey min-h-[calc(100vh-96px)]">
          <ToastContainer />
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
