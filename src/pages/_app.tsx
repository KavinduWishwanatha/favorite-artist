import 'semantic-ui-css/semantic.min.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@emotion/react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { wrapper, store, persistor } from '../redux';
import { theme, globalStyles } from '../theme';
import '@fontsource/inter';
import '@fontsource/manrope';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../config';

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 30000;

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  if (typeof window !== 'undefined') {
    window.onoffline = () => {
      toast.error('Connection Lost');
    };
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          {globalStyles}
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ToastContainer />
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
