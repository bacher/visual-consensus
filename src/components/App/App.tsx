import { useMemo, useState } from 'react';
import times from 'lodash/times';

import { Options } from '../Options';
import { ConsensusNodeVisualization } from '../ConsensusNodeVisualization';
import { Network } from '../../simulation/Network';
import { NetworkInterface } from '../../simulation/NetworkInterface';
import { ConsensusNode } from '../../simulation/ConsensusNode';
import type { NetworkOptions } from '../../common/types';

import styles from './App.module.scss';

export const NODES_COUNT = 2;

export function App() {
  const [networkOptions, setOptionsState] = useState<NetworkOptions>({
    avgLatency: 100,
    lossRate: 0.1,
  });

  const { network, nodes } = useMemo(() => {
    const network = new Network({ networkOptions });
    const nodes = times(NODES_COUNT, (index) => `node_${index}`).map(
      (nodeName) => {
        const networkInterface = new NetworkInterface(network, nodeName);
        return new ConsensusNode({ nodeName, networkInterface });
      },
    );

    return {
      network,
      nodes,
    };
  }, []);

  function setNetworkOptions(options: any) {
    setOptionsState(options);
    network.applyOptions(options);
  }

  return (
    <div className={styles.root}>
      <Options options={networkOptions} onChange={setNetworkOptions} />
      <div className={styles.nodesPanel}>
        {nodes.map((node) => (
          <ConsensusNodeVisualization
            key={node.nodeName}
            nodeName={node.nodeName}
          />
        ))}
      </div>
    </div>
  );
}
