import { useEffect } from 'react';

import { setAuthorizationToken, useQuery } from '../gqty';

export function useCurrentUser(suspense = true) {
  const { currentUser } = useQuery({
    prepare({ prepass, query: { currentUser } }) {
      prepass(currentUser, 'error', 'token', 'user.email');
    },
    suspense,
  });

  const { token, __typename } = currentUser;
  useEffect(() => {
    if (__typename) setAuthorizationToken(token);
  }, [token, __typename]);

  return {
    currentUser,
  };
}
