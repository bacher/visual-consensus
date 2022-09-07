import computer from '../../assets/computer.gif';
import type { ConsensusNode } from '../../simulation/ConsensusNode';

import styles from './ConsensusNodeVisualization.module.scss';
import { NetworkInterfaceLog } from '../NetworkInterfaceLog';

type Props = {
  node: ConsensusNode;
};

export function ConsensusNodeVisualization({ node }: Props) {
  return (
    <div className={styles.root}>
      <h3>ConsensusNodeVisualization {node.nodeName}</h3>
      <div>
        <img alt="" src={computer} width="200" />
      </div>
      <div>
        <NetworkInterfaceLog networkInterface={node.networkInterface} />
      </div>
    </div>
  );
}
