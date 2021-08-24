import {camelCase, toUpper} from 'lodash';
import createMessageService from '../MessageService';
import {BackgroundScriptMessage} from '../types';
import steps from './steps';
import './styles.css';

const pascalCase = (str: string): string =>
  camelCase(str).replace(/^(.)/, toUpper);

const handleMessage = ({type, data}: BackgroundScriptMessage): void => {
  console.warn('content script: received message', type, data);

  if (type === 'step') {
    // run step
    const stepClassName = `${pascalCase(data.name)}Step`;
    const step = new steps[stepClassName](data.name, data.props);
    step.run();
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
