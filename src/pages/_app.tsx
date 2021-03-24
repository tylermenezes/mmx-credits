import { ReactElement } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme, Container, Text } from '@chakra-ui/react';
import Page from '../Components/Page';
import { theme, GOOGLE_FONTS_LOAD } from '../theme';

const FONT_FAMILIES_URL = GOOGLE_FONTS_LOAD.map((f) => `family=${encodeURIComponent(f)}`).join('&');

export interface CustomAppProps {
  errorCode?: number | boolean | null | undefined
}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const { errorCode } = (pageProps || {}) as CustomAppProps;

  const ShowComponent = !errorCode ? Component : () => (
    <Page title={errorCode === 404 ? 'Not Found' : 'Error'}>
      <Container maxWidth="4xl" mt={16}>
        <Text as="h2" fontSize="3xl" fontWeight="bold" textAlign="center" fontFamily="heading">
          {errorCode === 404 ? `We couldn't find that page.` : `Error ${errorCode}`}
        </Text>
      </Container>
    </Page>
  );

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href={`https://fonts.googleapis.com/css2?${FONT_FAMILIES_URL}&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider theme={extendTheme(theme)}>
        <ShowComponent {...pageProps} />
      </ChakraProvider>
    </>
  )
}
