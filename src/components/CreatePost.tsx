import { useRef } from 'react';

import { Stack, Button, Input, Text } from '@chakra-ui/react';

import { query, useMutation } from '../gqty';

export function CreatePost() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [createPost, { isLoading }] = useMutation(
    (mutation, title: string) => {
      return mutation.createPost({
        post: {
          title,
        },
      }).title;
    },
    {
      refetchQueries: [query.currentUser],
      awaitRefetchQueries: true,
    }
  );

  return (
    <Stack as="form">
      <Text>Input your new post title</Text>
      <Input disabled={isLoading} ref={inputRef} placeholder="Post Title" />
      <Button
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={(ev) => {
          ev.preventDefault();
          if (!inputRef.current?.value) return;

          createPost({
            args: inputRef.current.value,
          }).then(() => {
            inputRef.current!.value = '';
            inputRef.current!.focus();
          });
        }}
      >
        Create Post{isLoading && '...'}
      </Button>
    </Stack>
  );
}
