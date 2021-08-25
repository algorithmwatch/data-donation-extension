import {Tabs, Runtime} from 'webextension-polyfill-ts';

export interface MessageService {
  connectionName: string;
  connection: null | Runtime.Port;
  callbacks: {[key: string]: any};
  connect: () => void;
  onConnect: (cb: () => void) => void;
  addListener: () => void;
  onMessage: (
    from: GenericMessage['from'],
    callback: (params: {
      message: GenericMessage;
      tab: Tabs.Tab | undefined;
      // messageService: this
    }) => void
  ) => void;
  sendMessage: (message: GenericMessage) => void;
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
  messageService: MessageService;
  configs: Config[];
  sessions: Session[];
  handleMessage: (message: GenericMessage, tab?: Tabs.Tab) => void;
  handleStepMessage: (step: GenericMessage['data'], tab: Tabs.Tab) => void;
  findSession: (tabId: number) => Session | undefined;
  removeSession: (tabId: number) => void;
  findConfigModel: (tabUrl?: string) => Config | undefined;
  createSession: (config: Config, tab: Tabs.Tab) => Session;
}
