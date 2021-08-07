import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useCurrentUser } from '../hooks/currentUser';

export function WithAuth<T extends Record<string, unknown>>(Cmp: FC<T>) {
  return function (props: T) {
    const {
      currentUser: { user, __typename },
    } = useCurrentUser();

    const { replace } = useRouter();
    useEffect(() => {
      if (__typename && !user?.id) {
        replace('/login');
      }
    }, [user, __typename]);

    if (user?.id) {
      return <Cmp {...props} />;
    }

    return <Spinner />;
  };
}
