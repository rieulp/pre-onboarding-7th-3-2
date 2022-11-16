import React from "react";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <header
      className={
        "flex items-center justify-between px-7 bg-white h-16 drop-shadow-sm"
      }
    >
      <h1 className={"items-start  text-black font-bold text-xl"}>{title}</h1>
      <div className={"flex flex-row text-gray2 w-32 justify-between"}>
        <span>개발</span>
      </div>
    </header>
  );
};

export default Header;
