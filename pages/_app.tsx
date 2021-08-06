import * as React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

export default function MyApp({
  Component,
  pageProps
}: import('next/app').AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
