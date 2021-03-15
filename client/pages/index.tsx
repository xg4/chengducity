import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chengdu City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <span className="ml-2 text-red-600">
          Hello Everyone, Welcome to{' '}
          <span className="font-bold">Chengdu City</span>
        </span>
      </main>
    </div>
  );
}
