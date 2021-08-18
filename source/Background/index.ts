import 'emoji-log';
import {browser, Tabs} from 'webextension-polyfill-ts';
import stepsConfig from '../config.json';
import doSomething from '../steps/doSomething';

const stepsMap: {[key: string]: Step} = {
  doSomething,
};

interface ConfigStep {
  name: string;
  someprop: string;
}

interface Config {
  name: string;
  steps: ConfigStep[];
}

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

const StepsHandler = {
  steps: [],
  currentStep: null,
  setup(config: Config): void {
    // init steps
    for (const step of config.steps) {
      this.steps.push(stepsMap[step.name].createBackgroundStep());
    }
  },
};

StepsHandler.setup(stepsConfig);

browser.tabs.onUpdated.addListener(handleTabUpdate);
browser.runtime.onConnect.addListener((port) => {
  if (port.name !== 'datadonation') {
    return;
  }

  port.onMessage.addListener((msg) => {
    // if (msg.joke === "Knock knock")
    //   port.postMessage({question: "Who's there?"});
    // else if (msg.answer === "Madame")
    //   port.postMessage({question: "Madame who?"});
    // else if (msg.answer === "Madame... Bovary")
    //   port.postMessage({question: "I don't get it."});
  });
});
