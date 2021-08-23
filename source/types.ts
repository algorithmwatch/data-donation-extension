import {Tabs, Runtime} from 'webextension-polyfill-ts';

export interface MessageService {
  connectionName: string;
  connection: null | Runtime.Port;
  createConnection: () => void;
  addConnectListener: (cb: () => void) => void;
  addMessageListener: (
    messageHandler: (
      message: ContentScriptMessage | BackgroundScriptMessage,
      tab?: Tabs.Tab
    ) => void
  ) => void;
  sendMessage: (
    message: ContentScriptMessage | BackgroundScriptMessage
  ) => void;
}

type StepName = string;

export interface ContentScriptMessage {
  type: 'step';
  data: {
    name: StepName;
    completed: boolean;
    data?: any;
  };
}

export interface BackgroundScriptMessage {
  type: 'step';
  data: {
    name: StepName;
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
  test?: (step: ContentScriptMessage['data']) => void;
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
  handleStep: (step: ContentScriptMessage['data']) => HandleStepResult;
  getCurrentStep: () => Step;
  setNextStepIndex: () => void;
}

export interface Session {
  tab: Tabs.Tab;
  config: Config;
}

export interface SessionManager {
  messageService: MessageService;
  configModels: ConfigModel[];
  sessions: Session[];
  handleMessage: (message: ContentScriptMessage, tab?: Tabs.Tab) => void;
  handleStepMessage: (
    step: ContentScriptMessage['data'],
    tab: Tabs.Tab
  ) => void;
  findSession: (tabId?: number) => Session | undefined;
  findConfigModel: (tabUrl?: string) => ConfigModel | undefined;
  createSession: (config: ConfigModel, tab: Tabs.Tab) => Session;
}
