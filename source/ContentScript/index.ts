import 'emoji-log';
import {browser, Runtime} from 'webextension-polyfill-ts';

interface MessageService {
  connectionName: string;
  connection: null | Runtime.Port;
  setup: () => void;
  createConnection: () => void;
  registerEventListener: () => void;
}

const MessageService: MessageService = {
  connectionName: 'datadonation',
  connection: null,
  setup() {
    this.createConnection();
  },
  createConnection() {
    this.connection = browser.runtime.connect(undefined, {
      name: this.connectionName,
    });
  },
  registerEventListener() {
    // port.postMessage({joke: 'Knock knock'});
    if (!this.connection) {
      throw new Error('Connection is null');
    }

    this.connection.onMessage.addListener((msg) => {
      console.warn('contentScript: message received', msg);
      // if (msg.question === "Who's there?") port.postMessage({answer: 'Madame'});
      // else if (msg.question === 'Madame who?')
      //   port.postMessage({answer: 'Madame... Bovary'});
    });
  },
};

console.emoji('🦄', 'helloworld from content script');

MessageService.setup();

export {};
