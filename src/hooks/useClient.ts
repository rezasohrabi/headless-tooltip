import { useEffect, useState } from 'react';

export function useClient() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { isClient };
}
