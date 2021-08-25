import {camelCase, toUpper} from 'lodash';
import {Tabs} from 'webextension-polyfill-ts';
import createMessageService from '../MessageService';
import {GenericMessage, MessageService} from '../types';
import steps from './steps';
import './styles.css';

const pascalCase = (str: string): string =>
  camelCase(str).replace(/^(.)/, toUpper);

const handleMessage = async (
  {type, data}: GenericMessage,
  _tab: Tabs.Tab | undefined,
  service: MessageService
): Promise<void> => {
  if (type === 'step') {
    // run step
    const {name, props} = data;
    const stepClassName = `${pascalCase(name)}Step`;
    const step = new steps[stepClassName](name, props);
    const result = await step.run();

    // notify background script that step has completed
    service.sendMessage({
      from: 'content',
      type: 'step',
      data: {
        name,
        data: result.data,
        completed: true,
      },
    });
  }
};

const messageService = createMessageService();
messageService.connect();
messageService.addListener();
messageService.onMessage('background', handleMessage);

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
