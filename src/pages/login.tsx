import { prepass } from 'gqty';
import { useRef } from 'react';

import { Button, Input, Stack, Text } from '@chakra-ui/react';

import { useMutation } from '../gqty';
import { useCurrentUser } from '../hooks/currentUser';

export default function Login() {
  const { currentUser } = useCurrentUser();
  const [login, { data, isLoading, error }] = useMutation(
    ({ login }, email: string) => {
      return prepass(
        login({
          input: {
            email,
          },
        }),
        'user.email',
        'error',
        'token'
      );
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);

  if (currentUser.user) return <p>Already Logged in</p>;

  const errorMessage = (data && data.error) || (error && error.message);

  return (
    <Stack>
      {errorMessage ? <Text color="red">{errorMessage}</Text> : null}
      <Stack as="form" maxWidth="350px">
        <Text>Email</Text>
        <Input fontSize="1.2em" ref={inputRef} placeholder="Put your email" />

        <Button
          marginTop="5px"
          backgroundColor="rgb(0,0, 100)"
          color="white"
          borderRadius="5px"
          padding="5px"
          fontWeight="bold"
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={(ev) => {
            ev.preventDefault();
            login({
              args: inputRef.current!.value,
            }).catch(console.error);
          }}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
}
