import {browser, Runtime} from 'webextension-polyfill-ts';

interface BackgroundMessageService {
  connectionName: string;
  connection: null | Runtime.Port;
  setup: () => void;
  addConnectListener: () => void;
  addMessageListener: () => void;
  handleIncomingMessage: (message: any) => void;
}

const BackgroundMessageService: BackgroundMessageService = {
  connectionName: 'datadonation',
  connection: null,
  setup() {
    this.addConnectListener();
    this.addMessageListener();
  },
  addConnectListener() {
    browser.runtime.onConnect.addListener((port) => {
      this.connection = port;
    });
  },
  addMessageListener() {
    if (!this.connection) {
      throw new Error('Connection is null');
    }

    this.connection.onMessage.addListener(this.handleIncomingMessage);
  },
  handleIncomingMessage(message) {
    console.warn('Background Script: Incoming message', msg);
  },
};

export default BackgroundMessageService;
