import React from 'react';

interface HeaderProps {
  title: string;
}
function Header({ title }: HeaderProps) {
  return (
    <header className="shadow">
      <div className="h-12 px-3 bg-white flex justify-between items-center">
        <h1 className="text-l font-bold">
          <span>{title}</span>
        </h1>
        <div>아이콘들</div>
      </div>
    </header>
  );
}

export default Header;
