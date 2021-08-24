import {render} from 'react-dom';
import Step from '../Step';
import InstructionContainer from '../components/InstructionContainer';

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

    render(InstructionContainer(this.props), rootElement);

    return this.finish();
  }
}

export default ShowInstructionContainerStep;
