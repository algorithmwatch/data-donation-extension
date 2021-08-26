import {camelCase, toUpper} from 'lodash';
import createMessageService from '../MessageService';
import {GenericMessage} from '../types';
import steps from './steps';
import Step from './steps/Step';
import './styles.css';

const pascalCase = (str: string): string =>
  camelCase(str).replace(/^(.)/, toUpper);

const handleStep = async (
  data: GenericMessage['data']
): Promise<ReturnType<Step['finish']>> => {
  // run step
  const {name, props} = data;
  const stepClassName = `${pascalCase(name)}Step`;
  const step = new steps[stepClassName](name, props);
  const result = await step.run();

  return result;
};

const messageService = createMessageService();
messageService.connect();
messageService.addListener();
messageService.onMessage('background', async ({message}) => {
  if (message.type !== 'step') {
    return;
  }

  // handle step
  const {name, data} = await handleStep(message.data);

  // notify background script that step has completed
  messageService.sendMessage({
    from: 'content',
    type: 'step',
    data: {
      name,
      data,
      completed: true,
    },
  });
});

// send message on injection (is fired when Document.readyState is "document_idle")
messageService.sendMessage({
  from: 'content',
  type: 'step',
  data: {
    name: 'wait-for-page-load',
    completed: true,
  },
});

export {};
