import { Button, ListItem, Stack, UnorderedList } from '@chakra-ui/react';

import { CreatePost } from '../components/CreatePost';
import { WithAuth } from '../components/WithRequireAuth';
import { CursorConnectionArgs, usePaginatedQuery } from '../gqty';

const first = 20;

export default WithAuth(function MyPosts() {
  const { data, fetchMore, isLoading } = usePaginatedQuery(
    (query, input: CursorConnectionArgs, { prepass }) => {
      if (!query.currentUser.user) return null;
      const posts = query.currentUser.user.posts({
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
        if (!incoming) return null;

        if (existing) {
          return {
            __typename: 'PostsConnection',
            ...incoming,
            nodes: uniqBy(
              [...existing.nodes, ...(incoming?.nodes || [])],
              (v) => v.id
            ),
          };
        }

        return incoming;
      },
    }
  );

  if (!data) return <p>Loading..</p>;

  return (
    <Stack padding="1em">
      <UnorderedList>
        {data?.nodes.map((post, index) => {
          return <ListItem key={post.id ?? index}>{post.title}</ListItem>;
        })}
      </UnorderedList>
      {data?.pageInfo.hasNextPage && (
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
});
