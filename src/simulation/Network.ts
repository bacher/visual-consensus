import type { NetworkOptions } from '../common/types';

export type NetworkMessageCallback = (info: {
  from: string;
  to: string;
  message: string;
}) => void;

export class Network {
  private readonly communicationMatrix = new Map<
    string,
    NetworkMessageCallback
  >();
  private networkOptions: NetworkOptions;

  public constructor({ networkOptions }: { networkOptions: NetworkOptions }) {
    this.networkOptions = networkOptions;
  }

  public applyOptions(networkOptions: NetworkOptions): void {
    this.networkOptions = networkOptions;
  }

  public sendMessage({
    from,
    to,
    message,
  }: {
    from: string;
    to: string;
    message: string;
  }): void {
    const isLost = Math.random() < this.networkOptions.lossRate;

    if (isLost) {
      return;
    }

    window.setTimeout(() => {
      const toListener = this.communicationMatrix.get(to);
      toListener?.({ from, to, message });
    }, this.networkOptions.avgLatency * (0.7 + Math.random() * 0.6));
  }

  public addNewMessagesListener(
    nodeName: string,
    callback: NetworkMessageCallback,
  ): void {
    this.communicationMatrix.set(nodeName, callback);
  }

  public init() {
    // noop
  }

  public destroy() {
    // noop
  }
}
