import {camelCase, toUpper} from 'lodash';
import createMessageService from '../MessageService';
import {BackgroundScriptMessage} from '../types';
import steps from './steps';
import './styles.css';

const pascalCase = (str: string): string =>
  camelCase(str).replace(/^(.)/, toUpper);

const handleMessage = async ({
  type,
  data: {name, props},
}: BackgroundScriptMessage): Promise<void> => {
  console.debug('content script: received message', name, props);

  if (type === 'step') {
    // run step
    const stepClassName = `${pascalCase(name)}Step`;
    const step = new steps[stepClassName](name, props);
    const result = await step.run();
    console.warn('step result', result);
  }
};

const messageService = createMessageService();
messageService.createConnection();
messageService.addMessageListener(handleMessage);

// send message on injection (is fired when Document.readyState is "document_idle")
messageService.sendMessage({
  type: 'step',
  data: {
    name: 'inject-content-script',
    completed: true,
  },
});

export {};
