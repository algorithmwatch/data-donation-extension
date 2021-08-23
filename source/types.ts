import {Tabs} from 'webextension-polyfill-ts';

export interface Message {
  type: 'step';
  data: {
    name: 'content-script-injected';
  };
}

export interface ConfigStep {
  name: string;
  someprop?: string;
}

export interface JSONConfig {
  name: string;
  matches: string[];
  steps: ConfigStep[];
}

export interface SessionConfig extends JSONConfig {
  handleStep: (step: Message['data']) => void;
}

export interface Session {
  tab: Tabs.Tab;
  config: SessionConfig;
}

export interface SessionManager {
  configs: JSONConfig[];
  sessions: Session[];
  handleMessage: (message: Message, tab?: Tabs.Tab) => void;
  handleStep: (step: Message['data'], tab?: Tabs.Tab) => void;
  findSession: (tabId: number) => Session | undefined;
  findConfig: (tabUrl: string) => JSONConfig | undefined;
  createSession: (config: JSONConfig, tab: Tabs.Tab) => Session;
}
