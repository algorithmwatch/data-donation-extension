import {render} from 'react-dom';
import Step from '../Step';
import Container from './Container';

class ShowInstructionContainerStep extends Step {
  async run(): Promise<void> {
    render(Container(this.props), document.querySelector(this.props.target));
  }
}

export default ShowInstructionContainerStep;
