import { Stack, UnorderedList, ListItem, Button } from '@chakra-ui/react';

import { CursorConnectionArgs, usePaginatedQuery } from '../gqty';
import { CreatePost } from './CreatePost';

const first = 20;

export function MyPosts() {
  const { data, fetchMore, isLoading } = usePaginatedQuery(
    (query, input: CursorConnectionArgs, { prepass }) => {
      const posts = query.currentUser.user!.posts({
        input,
      });

      return prepass(
        posts,
        'nodes.title',
        'pageInfo.hasNextPage',
        'pageInfo.endCursor'
      );
    },
    {
      initialArgs: {
        first,
      },
      merge({ data: { existing, incoming }, uniqBy }) {
        if (existing) {
          console.log({
            existing: JSON.parse(JSON.stringify(existing)),
            incoming: JSON.parse(JSON.stringify(incoming)),
          });
          return {
            ...incoming,
            nodes: uniqBy([...existing.nodes, ...incoming.nodes], (v) => v.id),
          };
        }

        return incoming;
      },
    }
  );

  if (!data) return <p>Loading..</p>;

  return (
    <Stack>
      <UnorderedList>
        {data.nodes.map((post) => {
          return <ListItem key={post.id}>{post.title}</ListItem>;
        })}
      </UnorderedList>
      {data.pageInfo.hasNextPage && (
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={() => {
            fetchMore({
              first,
              after: data.pageInfo.endCursor,
            });
          }}
        >
          More posts{isLoading && '...'}
        </Button>
      )}
      <CreatePost />
    </Stack>
  );
}
