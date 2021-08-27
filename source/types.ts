import {ReactNode} from 'react';
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
  type: 'step-info';
  data?: any;
}

export interface InstructionContainerButton {
  type?: 'button' | 'submit';
  size?: 'small' | 'medium' | 'large';
  theme?: 'primary' | 'secondary';
  // startIcon?: IconDefinition;
  // endIcon?: IconDefinition;
  classNames?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export interface StepProps {
  [key: string]: any;
}

export interface StepButton {
  label: string;
  action: string;
  theme: InstructionContainerButton['theme'];
}

export interface InstructionContainerProps extends StepProps {
  html: string;
  complete?: boolean;
  buttons?: StepButton[];
  onButtonClick?: (action?: string) => void;
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

export interface ConfigStep extends StepProps {
  name: StepName;
}

export interface Config {
  name: string;
  matches: string[];
  steps: ConfigStep[];
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
