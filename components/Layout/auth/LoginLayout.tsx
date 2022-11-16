import React from "react";
import Footer from "../Footer";

// import Router from "next/router";
import Image from "next/image";
import Logo from "public/assets/logo.png";

interface Props {
  children: React.ReactElement;
}

const LoginLayout = ({ children }: Props) => {
  return (
    <div
      className={"h-screen flex flex-col justify-center items-center bg-gray1"}
    >
      <div className={"flex flex-row items-center"}>
        <Image
          src={Logo}
          alt="logo"
          width={60}
          height={60}
          className={"rounded-lg"}
        />
        <h1 className={"text-5xl text-navy font-bold ml-3"}>PREFACE</h1>
      </div>
      <section
        className={"w-96 p-7 mt-10 mb-4 rounded-md drop-shadow-md bg-white"}
      >
        <h2 className={"font-bold text-black text-xl mb-3"}>로그인</h2>
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default LoginLayout;
