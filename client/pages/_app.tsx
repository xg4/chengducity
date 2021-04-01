import 'antd/dist/antd.css';
import dayjs from 'dayjs';
// import '../css/tailwind.css';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import store from '../store';

dayjs.extend(quarterOfYear);

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
        <Component {...pageProps}></Component>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
