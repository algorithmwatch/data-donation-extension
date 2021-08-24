import {Config, Session, SessionManager, MessageService} from '../types';
import createStepHandler from './StepHandler';

const createSessionManager = (
  configs: Config[],
  messageService: MessageService
): SessionManager => ({
  messageService,
  configs,
  sessions: [],

  handleMessage(message, tab): void {
    if (message?.type === 'step' && tab) {
      this.handleStepMessage(message.data, tab);
    }
  },

  handleStepMessage(step, tab): void {
    if (!tab || !tab.id || !tab.url) {
      throw new Error('Cannot handle step without Tab, Tab id or Tab url');
    }

    let session = this.findSession(tab.id);

    // Get session by tab id or create session by
    // config model that matches tab url.
    if (!session) {
      const config = this.findConfigModel(tab.url);

      if (config) {
        session = this.createSession(config, tab);
        this.sessions.push(session);
      } else {
        console.debug(`No config model found matching url "${tab.url}"`);
      }
    }

    if (session) {
      // get step result
      const {nextStep, allStepsComplete} = session.stepHandler.handleStep(step);

      if (nextStep) {
        // Send message to content script with next step info
        this.messageService.sendMessage({
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
    }
  },

  findSession(tabId): Session | undefined {
    return this.sessions.find((s) => s.tab.id === tabId);
  },

  removeSession(tabId): void {
    const index = this.sessions.findIndex((s) => s.tab.id === tabId);
    if (index !== -1) {
      this.sessions.splice(index, 1);
    }
  },

  findConfigModel(tabUrl): Config | undefined {
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
