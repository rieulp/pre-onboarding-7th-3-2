import Accordion from 'components/accordion';
import ActiveLink from 'components/activeLink';
import { logout } from 'api/api';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';

function Sider() {
  const onClickLogout = async () => {
    const result = await logout();
    if (result) Router.replace('/');
  };
  return (
    <SiderContainer className="bg-darkblue text-white min-h-screen">
      <div className="h-12 flex items-center justify-center">
        <h1 className="text-3xl font-bold">PREFACE</h1>
      </div>
      <nav>
        <Link href="/dashboard" className="block py-3 px-6">
          대시보드
        </Link>
        <Accordion.Item heading={'계좌 목록'}>
          <ActiveLink
            href="/account"
            className="block py-3 pl-8"
            activeClassName="active"
          >
            투자 계좌
          </ActiveLink>
        </Accordion.Item>
        <Link href={''} className="block py-3 px-6">
          사용자
        </Link>
        <button className="py-2 px-6" onClick={onClickLogout}>
          로그아웃
        </button>
      </nav>
    </SiderContainer>
  );
}

export default Sider;

const SiderContainer = styled.aside`
  a.active {
    background: #468ff7;
  }
`;
