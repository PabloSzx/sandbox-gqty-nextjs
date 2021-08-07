import { useEffect } from 'react';

import { setAuthorizationToken, useQuery } from '../gqty';

export function useCurrentUser(suspense = true) {
  const { currentUser } = useQuery({
    prepare({ prepass, query: { currentUser } }) {
      prepass(currentUser, 'error', 'token', 'user.email');
    },
    suspense,
  });

  const token = currentUser.token;
  useEffect(() => {
    setAuthorizationToken(token);
  }, [token]);

  return {
    currentUser,
  };
}
