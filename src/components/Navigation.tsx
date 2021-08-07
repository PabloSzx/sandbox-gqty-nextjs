import Link from 'next/link';

import { Button, ListItem, Stack, UnorderedList } from '@chakra-ui/react';

import { useCurrentUser } from '../hooks/currentUser';
import { Suspense } from './Suspense';

export function NavigationAuth() {
  const { currentUser } = useCurrentUser(false);

  if (currentUser.user) {
    return (
      <>
        <ListItem>
          <Button
            onClick={(ev) => {
              ev.preventDefault();
              currentUser.user = null;
              currentUser.token = null;
            }}
          >
            Logout
          </Button>
        </ListItem>

        <ListItem>
          <Link href="/my_posts" passHref>
            <Button as="a">My Posts</Button>
          </Link>
        </ListItem>
      </>
    );
  }

  return (
    <>
      <ListItem>
        <Link href="/login" passHref>
          <Button as="a">Login</Button>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/register" passHref>
          <Button as="a">Register</Button>
        </Link>
      </ListItem>
    </>
  );
}

export function Navigation() {
  return (
    <Stack as="nav">
      <UnorderedList
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
        listStyleType="none"
        sx={{
          li: {
            padding: '5px',
          },
        }}
      >
        <ListItem>
          <Link href="/" passHref>
            <Button as="a">Home</Button>
          </Link>
        </ListItem>
        <Suspense fallback={null}>
          <NavigationAuth />
        </Suspense>
      </UnorderedList>
    </Stack>
  );
}
