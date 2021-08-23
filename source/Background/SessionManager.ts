import cloneDeep from 'lodash/cloneDeep';
import {
  ConfigModel,
  Session,
  SessionManager,
  Config,
  StepModel,
  Step,
  HandleStepResult,
} from '../types';

const createStep = (stepModel: StepModel): Step => ({
  ...cloneDeep(stepModel),
  data: null,

  saveData(data): void {
    if (!this.data) {
      this.data = data;
    } else {
      this.data = [...this.data, data];
    }
  },
});

const createConfig = ({name, matches, steps}: ConfigModel): Config => ({
  name,
  matches,
  steps: steps.map((s) => createStep(s)),
  currentStepIndex: 0,

  /**
   * Map step name with current step and append data if provided.
   * If step is completed, increase step index and return next step name.
   */
  handleStep({name: stepName, completed, data}): HandleStepResult {
    console.warn('Handling step', {stepName, completed, data});
    const currentStep = this.getCurrentStep();
    const result: HandleStepResult = {
      nextStepName: null,
      allStepsCompleted: false,
    };

    if (currentStep.name !== stepName) {
      console.debug(
        `Step "${stepName}" not a current step in config "${this.name}" (current step is "${currentStep.name}")`
      );
      return result;
    }

    if (data) {
      currentStep.saveData(data);
    }

    if (completed === true) {
      this.setNextStepIndex();
      result.nextStepName = this.getCurrentStep().name;
    }

    result.allStepsCompleted = this.steps.length - 1 === this.currentStepIndex;

    return result;
  },

  getCurrentStep(): Step {
    return this.steps[this.currentStepIndex];
  },

  setNextStepIndex(): void {
    const nextIndex = this.currentStepIndex + 1;
    this.currentStepIndex =
      nextIndex >= this.steps.length ? this.currentStepIndex : nextIndex;
  },
});

const createSessionManager = (configModels: ConfigModel[]): SessionManager => ({
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

  /**
   * Get session by tab id and handle step.
   * If session does not exist, create session by
   * config model that matches tab url
   */
  handleStepMessage(step, tab): void {
    let session = this.findSession(tab.id);

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
      session.config.handleStep(step);
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
      config: createConfig(configModel),
    };
  },
});

export default createSessionManager;
