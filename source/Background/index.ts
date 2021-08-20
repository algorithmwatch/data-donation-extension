import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
// import stepsConfig from '../config.json';
// import StepsHandler from './StepsHandler';
import createMessageService from '../createMessageService';

const messageService = createMessageService();
messageService.addConnectListener(() =>
  messageService.addMessageListener((message: any, tab): void => {
    console.warn('background script: received message', message, tab);
  })
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
