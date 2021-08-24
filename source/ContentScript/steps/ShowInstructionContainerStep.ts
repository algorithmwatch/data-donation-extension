import {render} from 'react-dom';
import Step from '../Step';
import Container from './Container';

// TODO: https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39

class ShowInstructionContainerStep extends Step {
  async run(): Promise<void> {
    render(Container(this.props), document.querySelector(this.props.target));
  }
}

export default ShowInstructionContainerStep;
