import { Input, Text, Heading } from '@chakra-ui/react';
import { Fragment, Suspense, useState } from 'react';

import { useQuery, graphql, query } from '../gqty';

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
    <Fragment>
      <Text>Number of names</Text>
      <Input
        value={n}
        onChange={(ev) => setN(Math.max(ev.target.valueAsNumber, 0))}
        width="100px"
        type="number"
      />

      <Suspense fallback={<p>Names Loading...</p>}>
        <NamesList n={n} />
      </Suspense>
    </Fragment>
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

export function Hello() {
  return (
    <Fragment>
      <HelloWorld />
      <Names />
    </Fragment>
  );
}
