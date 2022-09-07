import { useEffect, useMemo, useState } from 'react';
import times from 'lodash/times';

import { OptionsPanel } from '../OptionsPanel';
import { ConsensusNodeVisualization } from '../ConsensusNodeVisualization';
import { Network } from '../../simulation/Network';
import { NetworkInterface } from '../../simulation/NetworkInterface';
import { ConsensusNode } from '../../simulation/ConsensusNode';
import type { NetworkOptions, StaticConfig } from '../../common/types';

import styles from './App.module.scss';

export const NODES_COUNT = 2;

export function App() {
  const [networkOptions, setOptionsState] = useState<NetworkOptions>({
    avgLatency: 100,
    lossRate: 0.1,
  });

  const staticConfig = useMemo<StaticConfig>(
    () => ({
      nodesNames: times(NODES_COUNT, (index) => `node_${index}`),
    }),
    [],
  );

  const { network, nodes } = useMemo(() => {
    const network = new Network({ networkOptions });
    const nodes = staticConfig.nodesNames.map((nodeName) => {
      const networkInterface = new NetworkInterface(network, nodeName);
      return new ConsensusNode({ nodeName, networkInterface, staticConfig });
    });

    return {
      network,
      nodes,
    };
  }, []);

  useEffect(() => {
    console.log('App Init');

    network.init();

    const initTimeouts = nodes.map((node) =>
      window.setTimeout(() => {
        node.init();
      }, (0.2 + Math.random() * 0.8) * 2000),
    );

    return () => {
      console.log('App Destroy');

      network.destroy();

      for (const initTimeout of initTimeouts) {
        window.clearTimeout(initTimeout);
      }

      for (const node of nodes) {
        node.destroy();
      }
    };
  }, []);

  function setNetworkOptions(options: any) {
    setOptionsState(options);
    network.applyOptions(options);
  }

  return (
    <div className={styles.root}>
      <OptionsPanel options={networkOptions} onChange={setNetworkOptions} />
      <div className={styles.nodesPanel}>
        {nodes.map((node) => (
          <ConsensusNodeVisualization key={node.nodeName} node={node} />
        ))}
      </div>
    </div>
  );
}
