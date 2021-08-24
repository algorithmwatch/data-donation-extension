import {Tabs, Runtime} from 'webextension-polyfill-ts';

export interface MessageService {
  connectionName: string;
  connection: null | Runtime.Port;
  createConnection: () => void;
  addConnectListener: (cb: () => void) => void;
  addMessageListener: (
    messageHandler: (
      message: ContentScriptMessage | BackgroundScriptMessage,
      tab: Tabs.Tab | undefined,
      messageService: this
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
  data: {[key: string]: any};
}

export interface StepModel {
  name: StepName;
  someprop?: string;
}

export interface StepProps {
  [key: string]: any;
}

export interface BackgroundStep {
  name: StepName;
  props: StepProps;
  data: any;
  saveData: (data: any) => void;
}

export interface HandleStepResult {
  nextStep: {name: string; props: StepProps} | null;
  allStepsCompleted: boolean;
}

export interface Config {
  name: string;
  matches: string[];
  steps: StepModel[];
}

export interface StepHandler {
  steps: BackgroundStep[];
  currentStepIndex: number;
  handleStep: (step: ContentScriptMessage['data']) => HandleStepResult;
  getCurrentStep: () => BackgroundStep;
  setNextStepIndex: () => void;
}

export interface Session {
  tab: Tabs.Tab;
  config: Config;
  stepHandler: StepHandler;
}

export interface SessionManager {
  messageService: MessageService;
  configs: Config[];
  sessions: Session[];
  handleMessage: (message: ContentScriptMessage, tab?: Tabs.Tab) => void;
  handleStepMessage: (
    step: ContentScriptMessage['data'],
    tab: Tabs.Tab
  ) => void;
  findSession: (tabId: number) => Session | undefined;
  removeSession: (tabId: number) => void;
  findConfigModel: (tabUrl?: string) => Config | undefined;
  createSession: (config: Config, tab: Tabs.Tab) => Session;
}
