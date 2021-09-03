import {browser} from 'webextension-polyfill-ts';
import createMessageService from '../MessageService';
import createSessionManager from './SessionManager';
import createBackendService from '../BackendService';
import {SessionManager} from '../types';

const init = async (): Promise<void> => {
  // load remote config files
  const backendService = createBackendService();
  await backendService.loadRemoteConfigs();

  // create message service
  const messageService = createMessageService();
  let sessionManager: SessionManager;

  // listen for messages
  messageService.onConnect(() => {
    // create or get session manager handling all tab sessions
    sessionManager =
      sessionManager || createSessionManager(backendService.configs);

    // handle messages from content script
    messageService.addListener();
    messageService.onMessage('content', ({message, tab}) => {
      if (message.type !== 'step-info' || !tab) {
        return;
      }

      // get session
      const session = sessionManager.getOrCreateSession(tab);
      if (!session) {
        return;
      }

      // handle step
      const {nextStep, allStepsComplete} = session.stepHandler.handleStep(
        message.data
      );

      // send message to content script with next step info
      if (nextStep) {
        messageService.sendMessage({
          from: 'background',
          type: 'step-info',
          data: nextStep,
        });
      }

      // TODO: send data to backend API
      if (allStepsComplete) {
        console.log(
          `All ${session.stepHandler.steps.length} steps completed`,
          session
        );

        const result = {
          name: session.config.name,
          stepsData: session.stepHandler.exportData(),
        };
        console.log('Data to upload:', result);

        backendService.uploadData(result);
      }
    });

    // remove session on tab close
    browser.tabs.onRemoved.addListener((tabId: number) => {
      if (sessionManager.getSession(tabId)) {
        console.debug('Remove session for Tab', tabId);
        sessionManager.removeSession(tabId);
      }
    });
  });
};

init();

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
