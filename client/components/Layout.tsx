import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';
import Nav from './Nav';

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ className, children }: LayoutProps) {
  const { data } = useSWR<string[], Error>('/api/v1/years', {
    revalidateOnFocus: false,
  });

  const list = data ?? [];

  const tabs = [{ name: '首页', path: '/' }].concat(
    list
      .map((year) => ({ name: `${year}年`, path: `/year/${year}` }))
      .sort()
      .reverse(),
  );
  return (
    <div className={className}>
      <Head>
        <title>成都房源信息 - Chengdu City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav links={tabs}></Nav>
      {children}
    </div>
  );
}
