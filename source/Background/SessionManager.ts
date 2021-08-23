import cloneDeep from 'lodash/cloneDeep';
import {JSONConfig, Session, SessionManager, Message} from '../types';

const createSessionManager = (configArr: JSONConfig[]): SessionManager => ({
  configs: configArr,
  sessions: [],

  handleMessage(message, tab): void {
    console.debug('Background script: received message', message, tab);

    if (message?.type === 'step') {
      this.handleStep(message.data, tab);
    }
  },

  handleStep(step, tab): void {
    if (!tab || !tab.id || !tab.url) {
      throw new Error('Cannot handle step without Tab, Tab id or Tab url');
    }

    // Get session by tab id and handle step.
    // If session does not exist, create session by
    // config that matches tab url
    let session = this.findSession(tab.id);

    if (!session) {
      const config = this.findConfig(tab.url);

      if (config) {
        session = this.createSession(config, tab);
        this.sessions.push(session);
      } else {
        console.debug(`No config found matching url "${tab.url}"`);
      }
    }

    if (session) {
      session.config.handleStep(step);
    }
  },

  findSession(tabId): Session | undefined {
    return this.sessions.find((s) => s.tab.id === tabId);
  },

  findConfig(tabUrl): JSONConfig | undefined {
    return this.configs.find((c) =>
      c.matches.some((url) => tabUrl.startsWith(url))
    );
  },

  createSession(config, tab): Session {
    return {
      tab,
      config: {
        ...cloneDeep(config),
        handleStep(step: Message['data']): void {
          console.warn('Handling step', step);
        },
      },
    };
  },
});

export default createSessionManager;
