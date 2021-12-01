import browser from 'webextension-polyfill';
import {MessageService} from './types';

const createMessageService = (): MessageService => ({
  connectionName: 'aw-datadonation',
  connection: null,
  callbacks: {},

  connect(): void {
    this.connection = browser.runtime.connect(undefined, {
      name: this.connectionName,
    });
  },

  onConnect(cb): void {
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

  addListener(): void {
    if (!this.connection) {
      throw new Error('Connection is null');
    }

    this.connection?.onMessage.addListener((message, port) => {
      console.debug('Received message', message, port);
      const callback = this.callbacks[message.from];

      if (callback) {
        callback({message, tab: port.sender?.tab});
      }
    });
  },

  onMessage(from, callback): void {
    this.callbacks[from] = callback;
  },

  sendMessage(message): void {
    this.connection?.postMessage(message);
  },
});

export default createMessageService;
