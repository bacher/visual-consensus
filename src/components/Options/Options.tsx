import type { NetworkOptions } from '../../common/types';

import styles from './Options.module.scss';

type Props = {
  options: NetworkOptions;
  onChange: (options: NetworkOptions) => void;
};

export function Options({ options, onChange }: Props) {
  return (
    <div className={styles.root}>
      <h2>Options</h2>
      <div className={styles.optionsList}>
        <label>
          <span className={styles.labelText}>Avg Latency (ms):</span>{' '}
          <input readOnly value={options.avgLatency} /> 0{' '}
          <input
            type="range"
            min={0}
            max={10000}
            value={options.avgLatency}
            onChange={(event) =>
              onChange({
                ...options,
                avgLatency: parseInt(event.target.value, 10),
              })
            }
          />
          10sec
        </label>
        <label>
          <span className={styles.labelText}>Loss rate (%):</span>{' '}
          <input readOnly value={options.lossRate} /> 0{' '}
          <input
            type="range"
            min={0}
            max={100}
            value={options.lossRate}
            onChange={(event) =>
              onChange({
                ...options,
                lossRate: parseInt(event.target.value, 10),
              })
            }
          />
          100%
        </label>
      </div>
    </div>
  );
}
