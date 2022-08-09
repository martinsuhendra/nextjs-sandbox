import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import { AppProps } from 'next/app';
import { NextComponentType } from 'next';
import { store } from '@/app/redux/store';
import { Provider as RTKProvider } from 'react-redux';
import Snackbar from '@/common/components/Snackbar';
import theme from '@/app/theme';
import ToastProvider from '@/common/components/ToastProvider';

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

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
    <RTKProvider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastProvider />
          <Component {...pageProps} />
          <Snackbar />
        </ThemeProvider>
      </CacheProvider>
    </RTKProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
