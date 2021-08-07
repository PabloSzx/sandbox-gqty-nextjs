/**
 * GQTY: You can safely modify this file and Query Fetcher based on your needs
 */

import { createClient, QueryFetcher } from 'gqty';

import { createLogger } from '@gqty/logger';
import { createReactClient } from '@gqty/react';
import { createSubscriptionsClient } from '@gqty/subscriptions';

import {
  generatedSchema,
  GeneratedSchema,
  scalarsEnumsHash,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated';

const headers = {
  'Content-Type': 'application/json',
  authorization:
    typeof window !== 'undefined'
      ? localStorage.getItem('auth-token') || ''
      : '',
};

export function setAuthorizationToken(token: string | null | undefined) {
  token = token || '';
  localStorage.setItem('auth-token', token);
  return (headers.authorization = token);
}

const queryFetcher: QueryFetcher = async function (query, variables) {
  const response = await fetch('https://examples-api.gqty.dev/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: 'cors',
  });

  const json = await response.json();

  return json;
};

const subscriptionsClient = createSubscriptionsClient({
  wsEndpoint: 'wss://examples-api.gqty.dev/graphql',
});

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
  subscriptionsClient,
  normalization: {
    identifier(obj) {
      switch (obj.__typename) {
        case 'AuthResult':
          return 'Auth';
        default:
          return;
      }
    },
  },
});

export const { query, mutation, mutate, subscription, resolved, refetch } =
  client;

export const {
  graphql,
  useQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
  useSubscription,
  usePaginatedQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: false,

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
});

createLogger(client, {
  stringifyJSON: false,
  showSelections: true,
  showCache: true,
}).start();

export * from './schema.generated';
