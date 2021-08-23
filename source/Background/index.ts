import 'emoji-log';
import {browser, Tabs} from 'webextension-polyfill-ts';
import testConfig from '../test-config.json';
import createMessageService from '../MessageService';
import createSessionManager from './SessionManager';

const sessionManager = createSessionManager([testConfig]);
const messageService = createMessageService();
messageService.addConnectListener(() =>
  messageService.addMessageListener(sessionManager.handleMessage)
);

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
