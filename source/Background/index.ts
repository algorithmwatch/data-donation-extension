import 'emoji-log';
import testConfig from '../test-config.json';
import createMessageService from '../MessageService';
import createSessionManager from './SessionManager';
import {ConfigModel, ContentScriptMessage} from '../types';

const messageService = createMessageService();
messageService.addConnectListener(() => {
  const sessionManager = createSessionManager(
    [testConfig as ConfigModel],
    messageService
  );
  messageService.addMessageListener((message, port) =>
    sessionManager.handleMessage(message as ContentScriptMessage, port)
  );
});

// const injectContentScript = async (): Promise<boolean> => {
//   const executing = await browser.tabs.executeScript({
//     file: '/js/contentScript.bundle.js',
//   });
//   if (executing[0] === true) {
//     console.warn('Content script injected 🎉');
//     return true;
//   }
//   return false;
// };

// const handleTabUpdate = (
//   _tabId: number,
//   changeInfo: Tabs.OnUpdatedChangeInfoType,
//   _tab: Tabs.Tab
// ): void => {
//   // inject content script
//   // TODO: inject based on url
//   const isWantedUrl = true;
//   if (isWantedUrl && changeInfo.status === 'complete') {
//     injectContentScript(); // async
//   }
// };
// browser.tabs.onUpdated.addListener(handleTabUpdate);

// browser.permissions.getAll().then((result) => {
//   console.log(result);
// });
