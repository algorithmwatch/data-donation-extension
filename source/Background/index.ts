import 'emoji-log';
import {browser, Tabs} from 'webextension-polyfill-ts';

const injectContentScript = async (): Promise<boolean> => {
  const executing = await browser.tabs.executeScript({
    file: '/js/contentScript.bundle.js',
  });
  if (executing[0] === true) {
    console.warn('Content script injected 🎉');
    return true;
  }
  return false;
};

const handleTabUpdate = (
  tabId: number,
  changeInfo: Tabs.OnUpdatedChangeInfoType,
  tab: Tabs.Tab
): void => {
  // inject content script
  // TODO: inject based on url
  const isWantedUrl = true;
  if (isWantedUrl && changeInfo.status === 'complete') {
    injectContentScript(); // async
  }
};

browser.tabs.onUpdated.addListener(handleTabUpdate);
