// import {browser} from 'webextension-polyfill-ts';
import createMessageService from '../MessageService';

const messageService = createMessageService();
messageService.createConnection();
messageService.addMessageListener((message: any): void => {
  console.warn('content script: received message', message);
});

// send message on injection
messageService.sendMessage({
  type: 'step',
  data: {
    name: 'content-script-injected',
    completed: true,
  },
});

export {};
