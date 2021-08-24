import {browser} from 'webextension-polyfill-ts';
import {MessageService} from './types';

const createMessageService = (): MessageService => ({
  connectionName: 'aw-datadonation',
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

  addMessageListener(from, messageHandler): void {
    if (!this.connection) {
      throw new Error('Connection is null');
    }

    this.connection?.onMessage.addListener((message, port) => {
      console.debug('Received message', message, port);

      if (message.from === from) {
        messageHandler(message, port.sender?.tab, this);
      }
    });
  },

  sendMessage(message): void {
    this.connection?.postMessage(message);
  },
});

export default createMessageService;
