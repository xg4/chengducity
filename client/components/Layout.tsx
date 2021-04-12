import React from 'react';
import { useYearsQuery } from '../generated/graphql';
import Nav from './Nav';

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ className, children }: LayoutProps) {
  const { data } = useYearsQuery();

  const list = data?.years ?? [];

  const tabs = [{ name: '首页', path: '/' }].concat(
    list
      .map((year) => ({ name: `${year}年`, path: `/year/${year}` }))
      .sort()
      .reverse(),
  );
  return (
    <div className={className}>
      <Nav links={tabs}></Nav>
      {children}
    </div>
  );
}
