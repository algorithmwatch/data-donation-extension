// import {browser} from 'webextension-polyfill-ts';
import createMessageService from '../MessageService';

const messageService = createMessageService();
messageService.createConnection();
messageService.addMessageListener((message): void => {
  console.warn('content script: received message', message);
});

// send message on injection (is fired when Document.readyState is "document_idle")
messageService.sendMessage({
  type: 'step',
  data: {
    name: 'inject-content-script',
    completed: true,
  },
});

export {};
