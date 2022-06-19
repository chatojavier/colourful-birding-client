import { useIsMounted } from './use-is-mounted';
import { useState } from 'react';

export function useRefresh() {
  const [, setVersion] = useState(0);
  const isMounted = useIsMounted();
  return () => {
    if (isMounted()) {
      setVersion((x) => x + 1);
    }
  };
}
