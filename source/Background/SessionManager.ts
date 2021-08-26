import {Config, Session, SessionManager} from '../types';
import createStepHandler from './StepHandler';

const createSessionManager = (configs: Config[]): SessionManager => ({
  configs,
  sessions: [],

  getSession(tabId): Session | undefined {
    return this.sessions.find((s) => s.tab.id === tabId);
  },

  getOrCreateSession(tab): Session | undefined {
    // Get session by tab id or create session by
    // config model that matches tab url.
    if (!tab || !tab.id || !tab.url) {
      throw new Error(
        'Cannot find or create session without Tab, Tab id or Tab url'
      );
    }

    let session = this.getSession(tab.id);

    if (!session) {
      const config = this.findConfig(tab.url);

      if (config) {
        session = this.createSession(config, tab);
        this.sessions.push(session);
      } else {
        console.debug(`No config model found matching url "${tab.url}"`);
      }
    }

    return session;
  },

  removeSession(tabId): void {
    const index = this.sessions.findIndex((s) => s.tab.id === tabId);
    if (index !== -1) {
      this.sessions.splice(index, 1);
    }
  },

  findConfig(tabUrl): Config | undefined {
    return tabUrl
      ? this.configs.find((c) =>
          c.matches.some((url) => tabUrl.startsWith(url))
        )
      : undefined;
  },

  createSession(config, tab): Session {
    return {
      tab,
      config,
      stepHandler: createStepHandler(config),
    };
  },
});

export default createSessionManager;
