import {browser} from 'webextension-polyfill-ts';
import 'emoji-log';
import testConfig from '../test-config.json';
import createMessageService from '../MessageService';
import createSessionManager from './SessionManager';
import {Config} from '../types';

const messageService = createMessageService();
messageService.addConnectListener(() => {
  const sessionManager = createSessionManager(
    [testConfig as Config],
    messageService
  );

  // handle messages from content script
  messageService.addMessageListener(
    'content',
    sessionManager.handleMessage.bind(sessionManager)
  );

  // remove session on tab close
  browser.tabs.onRemoved.addListener((tabId: number) => {
    const hasSession = sessionManager.findSession(tabId);

    if (hasSession) {
      sessionManager.removeSession(tabId);
    }
  });
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
