import { useState } from 'react';

import {
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';

import { Suspense } from '../components/Suspense';
import { graphql, query, useQuery } from '../gqty';

function NamesList({ n }: { n: number }) {
  const { namesList } = useQuery();

  return (
    <ol>
      {namesList({
        n,
      }).map((name, index) => {
        return <li key={index}>{name}</li>;
      })}
    </ol>
  );
}

function Names() {
  const [n, setN] = useState(10);
  return (
    <>
      <Text>Number of names</Text>
      <NumberInput
        width="100px"
        value={n}
        onChange={(_str, value) => setN(Math.max(value, 0))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Suspense fallback={<p>Names Loading...</p>}>
        <NamesList n={n} />
      </Suspense>
    </>
  );
}

const HelloWorld = graphql(
  function HelloWorld() {
    return (
      <Heading as="h1" fontSize="2em">
        {query.hello}
      </Heading>
    );
  },
  {
    suspense: {
      fallback: <p>Hello Loading...</p>,
    },
  }
);

export default function Hello() {
  return (
    <>
      <HelloWorld />
      <Names />
    </>
  );
}
