import {browser, Runtime, Tabs} from 'webextension-polyfill-ts';

interface MessageService {
  connectionName: string;
  connection: null | Runtime.Port;
  createConnection: () => void;
  addConnectListener: (cb: () => void) => void;
  addMessageListener: (
    messageHandler: (message: any, tab?: Tabs.Tab) => void
  ) => void;
  sendMessage: (message: any) => void;
}

const createMessageService = (): MessageService => ({
  connectionName: 'datadonation',
  connection: null,

  createConnection(): void {
    this.connection = browser.runtime.connect(undefined, {
      name: this.connectionName,
    });
  },

  addConnectListener(cb): void {
    browser.runtime.onConnect.addListener((port) => {
      if (port.name !== this.connectionName) {
        return;
      }

      this.connection = port;

      console.debug('Connection established', port);

      if (typeof cb === 'function') {
        cb();
      }
    });
  },

  addMessageListener(messageHandler): void {
    if (!this.connection) {
      throw new Error('Connection is null');
    }
    this.connection?.onMessage.addListener(
      (message: any, port: Runtime.Port) => {
        messageHandler(message, port.sender?.tab);
      }
    );
  },

  sendMessage(message: any): void {
    this.connection?.postMessage(message);
  },
});

export default createMessageService;
