import { ChakraProvider, Spinner } from '@chakra-ui/react';

import { Navigation } from '../components/Navigation';
import { Suspense } from '../components/Suspense';

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Suspense fallback={<Spinner />}>
        <Navigation />
        <Component {...pageProps} />
      </Suspense>
    </ChakraProvider>
  );
}
