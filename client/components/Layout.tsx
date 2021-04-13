import React from 'react';
import { useMetrics } from '../hooks';
import Nav from './Nav';

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ className, children }: LayoutProps) {
  const { yearOfData } = useMetrics();
  const tabs = [{ name: '首页', path: '/' }].concat(
    Object.keys(yearOfData)
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
