import {Tabs} from 'webextension-polyfill-ts';

type StepName = 'content-script-injected' | 'something-else';

export interface Message {
  type: 'step';
  data: {
    name: StepName;
    completed: boolean;
    data?: any;
  };
}

export interface StepModel {
  name: StepName;
  someprop?: string;
}

export interface ConfigModel {
  name: string;
  matches: string[];
  steps: StepModel[];
}

export interface Step extends StepModel {
  test?: (step: Message['data']) => void;
  data: any;
  saveData: (data: any) => void;
}

export interface HandleStepResult {
  nextStepName: StepName | null;
  allStepsCompleted: boolean;
}

export interface Config extends ConfigModel {
  steps: Step[];
  currentStepIndex: number;
  handleStep: (step: Message['data']) => HandleStepResult;
  getCurrentStep: () => Step;
  setNextStepIndex: () => void;
}

export interface Session {
  tab: Tabs.Tab;
  config: Config;
}

export interface SessionManager {
  configModels: ConfigModel[];
  sessions: Session[];
  handleMessage: (message: Message, tab?: Tabs.Tab) => void;
  handleStepMessage: (step: Message['data'], tab: Tabs.Tab) => void;
  findSession: (tabId?: number) => Session | undefined;
  findConfigModel: (tabUrl?: string) => ConfigModel | undefined;
  createSession: (config: ConfigModel, tab: Tabs.Tab) => Session;
}
