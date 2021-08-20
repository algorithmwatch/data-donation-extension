// import {browser} from 'webextension-polyfill-ts';
import createMessageService from '../createMessageService';

const messageService = createMessageService();
messageService.createConnection();
messageService.addMessageListener((message: any): void => {
  console.warn('content script: received message', message);
});

// send message on injection
messageService.sendMessage({
  type: 'content-script-injected',
  data: {text: 'hello'},
});

export {};
