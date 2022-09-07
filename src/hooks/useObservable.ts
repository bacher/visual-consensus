import { useEffect, useRef, useState } from 'react';

import type { Observable } from '../simulation/Observable';

export function useObservable(observable: Observable): void {
  const incRef = useRef(0);
  const [, setValue] = useState<number>(incRef.current);

  useEffect(
    () =>
      observable.listenChanges(() => {
        incRef.current++;
        setValue(incRef.current);
      }),
    [],
  );
}
