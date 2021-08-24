import {render} from 'react-dom';
import Step from '../Step';
import Container from './Container';

class ShowInstructionContainerStep extends Step {
  async run(): Promise<void> {
    const root = document.querySelector(this.props.target);
    root.attachShadow({mode: 'open'});

    render(Container(this.props), root.shadowRoot);
  }
}

export default ShowInstructionContainerStep;
