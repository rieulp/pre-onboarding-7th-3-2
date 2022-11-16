import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";

import Accordion from "components/accordion";
import ActiveLink from "components/ActiveLink";
import Logo from "public/assets/logo.png";
import styled from "styled-components";
import Image from "next/image";
import { logout } from "lib/api/auth";
import { useQueryClient } from "@tanstack/react-query";

function Sider() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const onClickLogout = async () => {
    logout().then(() => {
      queryClient.clear();
      router.replace("/");
    });
  };
  return (
    <aside className={"min-h-[calc(100vh-84px)] w-72 bg-primary2 text-gray1"}>
      <div className={"flex items-center px-4 h-16"}>
        <Image src={Logo} alt="logo" width={40} height={40} />
        <h1 className={"ml-2 text-white font-bold text-3xl"}>PREFACE</h1>
      </div>
      <nav>
        <Link href="" className="block py-4 px-6">
          대시보드
        </Link>
        <Accordion.Item heading={"계좌 목록"}>
          <ActiveLink
            href="/account"
            className="block py-4 pl-8"
            activeClassName="bg-primary3 text-white"
          >
            투자 계좌
          </ActiveLink>
        </Accordion.Item>
        <Link href="" className="block py-4 px-6">
          사용자
        </Link>
        <button className="py-4 px-6" onClick={onClickLogout}>
          로그아웃
        </button>
      </nav>
    </aside>
  );
}

export default Sider;
