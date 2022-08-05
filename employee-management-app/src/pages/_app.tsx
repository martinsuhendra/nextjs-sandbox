import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../app/theme';
import createEmotionCache from '../createEmotionCache';
import { AppProps } from 'next/app';
import { NextComponentType } from 'next';
import ToastProvider from '../common/components/ToastProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { store } from '../app/redux/store';
import { Provider as RTKProvider } from 'react-redux';
import useAppSelector from '../common/hooks/useAppSelector';
import Snackbar from '../common/components/Snackbar';

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

interface ExtendedAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: React.FC &
    NextComponentType &
    Partial<{
      Layout: typeof React.Fragment;
    }>;
}

export default function MyApp(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <RTKProvider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant,
				consistent, and simple baseline to
				build upon. */}
            <CssBaseline />
            <ToastProvider />
            <Component {...pageProps} />
            <Snackbar />
          </ThemeProvider>
        </CacheProvider>
      </RTKProvider>
    </QueryClientProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
