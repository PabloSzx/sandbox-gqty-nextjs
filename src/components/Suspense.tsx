import {
  Suspense as ReactSuspense,
  SuspenseProps,
  useEffect,
  useState,
} from 'react';

let isClientGlobal = false;

export const Suspense = function SuspenseSSR(
  props: SuspenseProps
): ReturnType<typeof ReactSuspense> {
  const [isClient, setIsClient] = useState(isClientGlobal);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
      isClientGlobal = true;
    }
  }, []);

  if (isClient) return <ReactSuspense {...props} />;

  return <>{props.fallback || null}</>;
};
