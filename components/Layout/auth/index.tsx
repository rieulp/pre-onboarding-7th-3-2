import React, { useEffect, type ReactElement } from 'react';
import Footer from '../footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import { getToken } from 'lib/tokenStorage';

interface LayoutProps {
  children: ReactElement;
}

function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const token = getToken();
    if (token) Router.replace('/account');
  }, []);

  return (
    <div className="bg-bg_grey">
      <ToastContainer />
      <main className="min-h-[calc(100vh-48px)] flex justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
