import {browser} from 'webextension-polyfill-ts';
import testConfig from '../test-config.json';
import createMessageService from '../MessageService';
import createSessionManager from './SessionManager';
import {Config} from '../types';

const messageService = createMessageService();
messageService.onConnect(() => {
  // create session manager handling all tab sessions
  const sessionManager = createSessionManager([testConfig as Config]);

  // handle messages from content script
  messageService.addListener();
  messageService.onMessage('content', ({message, tab}) => {
    if (message.type !== 'step' || !tab) {
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

    // Send message to content script with next step info
    if (nextStep) {
      messageService.sendMessage({
        from: 'background',
        type: 'step',
        data: nextStep,
      });
    }

    // Do something when everything is complete
    if (allStepsComplete) {
      console.log(
        `All ${session.stepHandler.steps.length} steps completed`,
        session
      );
    }
  });

  // remove session on tab close
  browser.tabs.onRemoved.addListener((tabId: number) => {
    const hasSession = sessionManager.getSession(tabId);

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
