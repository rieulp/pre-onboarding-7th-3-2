import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import Footer from "../Footer";
import Content from "./Content";
import Header from "./Header";
import Sider from "./sider";

interface LayoutProps {
  children: ReactNode;
}

const title: Record<string, string> = {
  "/dashboard": "대시보드",
  "/account": "투자계좌",
  "/user": "김핀트님의 계좌 목록",
};

function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const { asPath } = router;
  return (
    <div className="grid grid-cols-[250px_1fr]">
      <Sider />
      <div className="m-h-screen">
        <Header title={title[asPath] || ""} />
        <Content>{children}</Content>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
