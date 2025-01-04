import { createClient } from 'graphql-ws';
import type {
  GraphQLResponse,
  SubscribeFunction,
  Environment,
  type FetchFunction,
  Network,
  Observable,
  RecordSource,
  Store,
} from 'relay-runtime';

import { env } from '@/config/env';

const HTTP_ENDPOINT = env.API_URL;

const wsClient = createClient({
  connectionParams: {
    location: window.location.pathname,
  },
  url: env.WEBSOCKET_API_URL,
});

const isGraphQLResponse = (value: unknown): value is GraphQLResponse =>
  Boolean(
    value &&
      typeof value === 'object' &&
      'data' in value &&
      value.data !== null,
  );

const subscribe: SubscribeFunction = (operation, variables) =>
  Observable.create((sink) =>
    wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text!,
        variables,
      },
      {
        complete: sink.complete,
        error: sink.error,
        next: (value) => {
          if (isGraphQLResponse(value)) {
            sink.next(value);
          } else {
            sink.error(new Error('Invalid GraphQL response'));
          }
        },
      },
    ),
  );

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
    credentials: 'include',
    headers: {
      Accept:
        'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return await resp.json();
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn, subscribe),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
