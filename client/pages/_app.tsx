import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import '../css/tailwind.css';
import store from '../store';

dayjs.extend(quarterOfYear);

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>成都房源信息 - Chengdu City</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <SWRConfig
            value={{
              fetcher: async (url: RequestInfo, options?: RequestInit) => {
                const res = await fetch(url, options);

                if (!res.ok) {
                  const msg = await res.json();
                  const error = new Error(msg);

                  // error.status = res.status;
                  throw error;
                }

                return res.json();
              },
            }}
          >
            <ConfigProvider locale={zhCN}>
              <Component {...pageProps}></Component>
            </ConfigProvider>
          </SWRConfig>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
