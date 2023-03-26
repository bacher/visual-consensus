import computer from '../../assets/computer.gif';
import type { ConsensusNode } from '../../simulation/ConsensusNode';

import styles from './ConsensusNodeVisualization.module.scss';
import { NetworkInterfaceLog } from '../NetworkInterfaceLog';
import { useObservable } from '../../hooks/useObservable';

type Props = {
  node: ConsensusNode;
};

export function ConsensusNodeVisualization({ node }: Props) {
  useObservable(node);

  return (
    <div className={styles.root}>
      <h3>ConsensusNodeVisualization {node.nodeName}</h3>
      <div>
        <img alt="" src={computer} width="200" />
      </div>
      <div>
        <h3>State:</h3>
        <pre className={styles.stateBlock}>{JSON.stringify(node.getState(), null, 2)}</pre>
      </div>
      <div>
        <NetworkInterfaceLog networkInterface={node.networkInterface} />
      </div>
    </div>
  );
}
