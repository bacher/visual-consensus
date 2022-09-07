import type { Network } from './Network';
import { Observable } from './Observable';

export type MessageCallback = (from: string, message: string) => void;

export type NetworkLogEntry = {
  packetIndex: number;
  ts: Date;
} & (
  | {
      type: 'incoming';
      from: string;
      message: string;
    }
  | {
      type: 'outgoing';
      to: string;
      message: string;
    }
);

export class NetworkInterface extends Observable {
  private readonly network: Network;
  private readonly nodeName: string;
  private readonly log: NetworkLogEntry[] = [];
  private lastPacketIndex = 0;
  private newMessagesCallback?: MessageCallback;

  constructor(network: Network, nodeName: string) {
    super();

    this.network = network;
    this.nodeName = nodeName;

    this.network.addNewMessagesListener(this.nodeName, ({ from, message }) => {
      this.log.push({
        packetIndex: ++this.lastPacketIndex,
        ts: new Date(),
        type: 'incoming',
        from,
        message,
      });

      this.newMessagesCallback?.(from, message);

      this.emitChange();
    });
  }

  public sendMessage(destination: string, message: string): void {
    this.network.sendMessage({
      from: this.nodeName,
      to: destination,
      message,
    });

    this.log.push({
      packetIndex: ++this.lastPacketIndex,
      ts: new Date(),
      type: 'outgoing',
      to: destination,
      message,
    });

    this.emitChange();
  }

  public setNewMessagesListener(callback: MessageCallback): void {
    this.newMessagesCallback = callback;
  }

  public getLog(): NetworkLogEntry[] {
    return this.log;
  }
}
