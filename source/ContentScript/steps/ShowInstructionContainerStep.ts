import {render} from 'react-dom';
import Step from '../Step';
import InstructionContainer from '../InstructionContainer';

// TODO: https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39

class ShowInstructionContainerStep extends Step {
  async run(): Promise<void> {
    const rootElementId = 'aw-extension-instruction-container';

    // check if react root exists already and create if not
    let rootElement = document.getElementById(rootElementId);

    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = rootElementId;
      document.body.appendChild(rootElement);
    }

    render(InstructionContainer(this.props), rootElement);
  }
}

export default ShowInstructionContainerStep;
