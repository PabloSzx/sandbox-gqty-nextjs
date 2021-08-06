import * as React from 'react';

import { Stack, Text } from '@chakra-ui/react';
import { useQuery } from '../gqty';

export default function Home() {
  const { hello } = useQuery();
  return (
    <Stack>
      <Text fontSize="3em">zxczxc World</Text>
      <Text>{hello || 'Loadiasdasdng...'}</Text>
    </Stack>
  );
}
