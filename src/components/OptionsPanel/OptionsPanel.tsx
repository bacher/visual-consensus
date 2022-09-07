import type { NetworkOptions } from '../../common/types';

import styles from './OptionsPanel.module.scss';

type Props = {
  options: NetworkOptions;
  onChange: (options: NetworkOptions) => void;
};

export function OptionsPanel({ options, onChange }: Props) {
  return (
    <div className={styles.root}>
      <h2>Options</h2>
      <div className={styles.optionsList}>
        <label>
          <span className={styles.labelText}>Avg Latency (sec):</span>{' '}
          <input readOnly value={(options.avgLatency / 1000).toFixed(3)} /> 0{' '}
          <input
            type="range"
            min={0}
            max={10000}
            step={1}
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
          <input readOnly value={options.lossRate * 100} /> 0{' '}
          <input
            type="range"
            min={0}
            step={1}
            max={100}
            value={options.lossRate * 100}
            onChange={(event) =>
              onChange({
                ...options,
                lossRate: parseInt(event.target.value, 10) / 100,
              })
            }
          />
          100%
        </label>
      </div>
    </div>
  );
}
