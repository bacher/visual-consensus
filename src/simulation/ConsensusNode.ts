import type { NetworkInterface } from './NetworkInterface';
import { Observable } from './Observable';
import { StaticConfig } from '../common/types';

export class ConsensusNode extends Observable {
  public readonly nodeName: string;

  public readonly networkInterface: NetworkInterface;
  private readonly staticConfig: StaticConfig;
  private intervalId: number | undefined;

  constructor({
    nodeName,
    networkInterface,
    staticConfig,
  }: {
    nodeName: string;
    networkInterface: NetworkInterface;
    staticConfig: StaticConfig;
  }) {
    super();

    this.staticConfig = staticConfig;
    this.nodeName = nodeName;
    this.networkInterface = networkInterface;
  }

  public getState(): string {
    return 'Nothing';
  }

  public init() {
    this.intervalId = window.setInterval(() => {
      const others = this.staticConfig.nodesNames.filter(
        (nodeName) => nodeName !== this.nodeName,
      );

      for (const targetNodeName of others) {
        this.networkInterface.sendMessage(
          targetNodeName,
          JSON.stringify(
            {
              someRandom: `text${Math.random()}`,
            },
            null,
            2,
          ),
        );
      }
    }, 3000);
  }

  public destroy() {
    window.clearInterval(this.intervalId);
  }
}
