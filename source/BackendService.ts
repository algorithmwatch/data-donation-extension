import {browser} from 'webextension-polyfill-ts';
import {BackendService, Config} from './types';
import testConfig from './test-config.json';

const createBackendService = (): BackendService => ({
  configs: [],

  async loadRemoteConfigs(): Promise<void> {
    // TODO: load config files from backend API here
    // and store them in Storage, so they are available
    // everywhere (content/background scripts, popup etc.)
    // see: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage

    // dummy code:
    this.configs = [testConfig as Config];

    // save configs to storage
    // TODO: maybe only save config files if they have changed remotely
    await browser.storage.local.set({
      configs: this.configs,
    });
  },

  async uploadData(_data): Promise<void> {
    // TODO: send data donation to backend API
    return Promise.resolve();
  },
});

export default createBackendService;
