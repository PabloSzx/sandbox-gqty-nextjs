import * as React from 'react';

import { Stack, Text } from '@chakra-ui/react';
import { useQuery } from '../src/gqty';

export default function Home() {
  const { hello } = useQuery();
  return (
    <Stack>
      <Text fontSize="3em">Hello World</Text>
      <Text>{hello || 'Loading...'}</Text>
    </Stack>
  );
}
