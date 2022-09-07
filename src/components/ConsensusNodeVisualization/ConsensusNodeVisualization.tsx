import styles from './ConsensusNodeVisualization.module.scss';

type Props = {
  nodeName: string;
};

export function ConsensusNodeVisualization({ nodeName }: Props) {
  return (
    <div className={styles.root}>ConsensusNodeVisualization {nodeName}</div>
  );
}
