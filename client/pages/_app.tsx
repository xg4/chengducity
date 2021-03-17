import 'antd/dist/antd.css';
import dayjs from 'dayjs';
// import '../css/tailwind.css';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

dayjs.extend(quarterOfYear);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => {
          const res = await fetch(url);

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
      <Component {...pageProps}></Component>
    </SWRConfig>
  );
}

export default MyApp;
