import {pascalCase} from '../helper';
import createMessageService from '../MessageService';
import {GenericMessage} from '../types';
import steps from './steps';
import Step from './steps/Step';
import './styles.css';

const handleStep = async (
  data: GenericMessage['data']
): Promise<ReturnType<Step['finish']>> => {
  // run step
  const {name, props} = data;
  const stepClassName = `${pascalCase(name)}Step`;
  try {
    const step = new steps[stepClassName](name, props);
    const result = await step.run();
    return result;
  } catch (error) {
    throw new Error(`Error executing step "${stepClassName}": ${error}`);
  }
};

const messageService = createMessageService();
messageService.connect();
messageService.addListener();
messageService.onMessage('background', async ({message}) => {
  if (message.type !== 'step-info') {
    return;
  }

  if (message.data.name === 'wait-for-page-load') {
    // not handled by an actual step, but fired on every page load instead
    return;
  }

  // handle step
  const {name, data, complete, callback} = await handleStep(message.data);

  // notify background script that step is complete
  if (complete) {
    messageService.sendMessage({
      from: 'content',
      type: 'step-info',
      data: {
        name,
        data,
        complete,
      },
    });
  }

  if (typeof callback === 'function') {
    callback();
  }
});

// send message on injection (is fired when Document.readyState is "document_idle")
messageService.sendMessage({
  from: 'content',
  type: 'step-info',
  data: {
    name: 'wait-for-page-load',
    complete: true,
  },
});

export {};
