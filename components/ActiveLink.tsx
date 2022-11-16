import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface ActiveLinkProps extends LinkProps {
  children: React.ReactNode;
  activeClassName: string;
  className?: string;
}
function ActiveLink({
  children,
  className = "",
  activeClassName,
  href,
  as,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const cName =
    asPath === href || asPath === as || asPath.startsWith(href.toString())
      ? `${className} ${activeClassName}`.trim()
      : className;

  return (
    <Link href={href} {...rest} className={cName}>
      {children}
    </Link>
  );
}

export default ActiveLink;
