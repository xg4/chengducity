import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chengdu City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto w-1/2 shadow mt-32 bg-gray-100">
          <p className="text-red-600">
            Hello Everyone, welcome to{' '}
            <span className="font-bold">Chengdu City</span>
          </p>
          <p>Web page, coming soon.</p>
          <p>
            Now you can talk to{' '}
            <a
              className="underline text-blue-400"
              href="https://t.me/chengducitybot"
            >
              t.me/chengducitybot
            </a>
            , using Telegram.
          </p>
        </div>
      </main>
    </div>
  );
}
