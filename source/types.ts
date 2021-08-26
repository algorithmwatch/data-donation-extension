import {Tabs, Runtime} from 'webextension-polyfill-ts';

export interface MessageService {
  connectionName: string;
  connection: null | Runtime.Port;
  callbacks: {[key: string]: (params: MessageServiceCallbackParams) => void};
  connect: () => void;
  onConnect: (cb: () => void) => void;
  addListener: () => void;
  onMessage: (
    from: GenericMessage['from'],
    callback: (params: MessageServiceCallbackParams) => void
  ) => void;
  sendMessage: (message: GenericMessage) => void;
}

export interface MessageServiceCallbackParams {
  message: GenericMessage;
  tab: Tabs.Tab | undefined;
  // messageService: this
}

type StepName = string;

export interface GenericMessage {
  from: 'background' | 'content';
  type: 'step';
  data?: any;
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
  allStepsComplete: boolean;
}

export interface Config {
  name: string;
  matches: string[];
  steps: StepModel[];
}

export interface StepHandler {
  steps: BackgroundStep[];
  currentStepIndex: number;
  handleStep: (step: GenericMessage['data']) => HandleStepResult;
  getCurrentStep: () => BackgroundStep;
  setNextStepIndex: () => void;
}

export interface Session {
  tab: Tabs.Tab;
  config: Config;
  stepHandler: StepHandler;
}

export interface SessionManager {
  configs: Config[];
  sessions: Session[];
  getSession: (tabId: number) => Session | undefined;
  getOrCreateSession: (tab: Tabs.Tab) => Session | undefined;
  removeSession: (tabId: number) => void;
  findConfig: (tabUrl?: string) => Config | undefined;
  createSession: (config: Config, tab: Tabs.Tab) => Session;
}
