import {render, unmountComponentAtNode} from 'react-dom';
import Step from './Step';
import InstructionContainer from '../components/InstructionContainer';
import {InstructionContainerProps} from '../../types';

class ShowInstructionContainerStep extends Step {
  async run(): Promise<ReturnType<Step['finish']>> {
    const rootElementId = 'aw-extension-instruction-container';

    // check if react root exists already and create if not
    let rootElement = document.getElementById(rootElementId);

    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = rootElementId;
      document.body.appendChild(rootElement);
    }

    // add callback to mark current step as complete/incomplete
    this.props.finishCallback = (action: string): void => {
      if (action === 'submit') {
        this.complete = true;
      } else if (action === 'cancel') {
        this.complete = false;
      }

      // unmount component
      if (rootElement) {
        unmountComponentAtNode(rootElement);
      }
    };

    render(
      InstructionContainer(this.props as InstructionContainerProps),
      rootElement
    );

    // wait for complete variable to be set
    await this.isComplete();

    // finish up
    return this.finish();
  }
}

export default ShowInstructionContainerStep;
