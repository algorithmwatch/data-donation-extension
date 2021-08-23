import {browser} from 'webextension-polyfill-ts';
import {MessageService} from './types';

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
    this.connection?.onMessage.addListener((message, port) => {
      messageHandler(message, port.sender?.tab);
    });
  },

  sendMessage(message): void {
    this.connection?.postMessage(message);
  },
});

export default createMessageService;
