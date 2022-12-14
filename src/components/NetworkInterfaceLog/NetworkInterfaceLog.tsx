import type { NetworkInterface } from '../../simulation/NetworkInterface';
import { useObservable } from '../../hooks/useObservable';

import styles from './NetworkInterfaceLog.module.scss';

export type Props = {
  networkInterface: NetworkInterface;
};

export function NetworkInterfaceLog({ networkInterface }: Props) {
  useObservable(networkInterface);

  const logEntries = [...networkInterface.getLog()].reverse();

  return (
    <div className={styles.root}>
      <h3>Network log:</h3>
      <ul className={styles.list}>
        {logEntries.map((entry) => (
          <li key={entry.packetIndex} className={styles.item}>
            <span>{entry.ts.toJSON()}</span>{' '}
            {entry.type === 'incoming' ? (
              <span>{`receive from ${entry.from}:`}</span>
            ) : (
              <span>{`sending to ${entry.to}:`}</span>
            )}
            <pre className={styles.message}>{entry.message}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
