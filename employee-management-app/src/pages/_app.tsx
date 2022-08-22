import * as React from 'react'

import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { NextComponentType } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { Provider as RTKProvider } from 'react-redux'

import Snackbar from '@/common/components/Snackbar'
import ToastProvider from '@/common/components/ToastProvider'
import { store } from '@/redux/store'
import theme from '@/theme'

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createCache({ key: 'css', prepend: true })

interface ExtendedAppProps extends AppProps {
  emotionCache?: EmotionCache
  Component: React.FC &
    NextComponentType &
    Partial<{
      Layout: typeof React.Fragment
    }>
}

const MyApp = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

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
  )
}

export default appWithTranslation(MyApp)
