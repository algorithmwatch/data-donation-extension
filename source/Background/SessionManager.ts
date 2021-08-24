import {ConfigModel, Session, SessionManager, MessageService} from '../types';
import createStepHandler from './StepHandler';

const createSessionManager = (
  configModels: ConfigModel[],
  messageService: MessageService
): SessionManager => ({
  messageService,
  configModels,
  sessions: [],

  handleMessage(message, tab): void {
    console.debug('Background script: received message', message, tab);

    if (!tab || !tab.id || !tab.url) {
      throw new Error('Cannot handle step without Tab, Tab id or Tab url');
    }

    if (message?.type === 'step') {
      this.handleStepMessage(message.data, tab);
    }
  },

  handleStepMessage(step, tab): void {
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
      const {nextStep, allStepsCompleted} =
        session.stepHandler.handleStep(step);

      if (nextStep) {
        // Send message to content script with next step info
        this.messageService.sendMessage({
          type: 'step',
          data: nextStep,
        });
      }

      // Do something when everything is complete
      if (allStepsCompleted) {
        console.log(`All ${session.stepHandler.steps.length} steps completed`);
      }
    }
  },

  findSession(tabId): Session | undefined {
    return this.sessions.find((s) => s.tab.id === tabId);
  },

  findConfigModel(tabUrl): ConfigModel | undefined {
    return tabUrl
      ? this.configModels.find((c) =>
          c.matches.some((url) => tabUrl.startsWith(url))
        )
      : undefined;
  },

  createSession(configModel, tab): Session {
    return {
      tab,
      config: configModel,
      stepHandler: createStepHandler(configModel),
    };
  },
});

export default createSessionManager;
