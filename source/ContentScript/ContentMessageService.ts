import {browser, Runtime} from 'webextension-polyfill-ts';

interface ContentMessageService {
  connectionName: string;
  connection: null | Runtime.Port;
  setup: () => void;
  createConnection: () => void;
  addMessageListener: () => void;
  handleIncomingMessage: (message: any) => void;
}

const ContentMessageService: ContentMessageService = {
  connectionName: 'datadonation',
  connection: null,
  setup() {
    this.createConnection();
    this.addMessageListener();
  },
  createConnection() {
    this.connection = browser.runtime.connect(undefined, {
      name: this.connectionName,
    });
  },
  addMessageListener() {
    // port.postMessage({joke: 'Knock knock'});
    if (!this.connection) {
      throw new Error('Connection is null');
    }

    this.connection.onMessage.addListener(this.handleIncomingMessage);
  },
  handleIncomingMessage(message) {
    console.warn('Content Script: Incoming message', msg);
  },
};

export default ContentMessageService;
