import {render, unmountComponentAtNode} from 'react-dom';
import Step from './Step';
import Dialog from '../components/Dialog';
import {DialogProps} from '../../types';

class ShowDialogStep extends Step {
  async run(): Promise<ReturnType<Step['finish']>> {
    const rootElement = this.getDialogRoot();

    // add callback to mark current step as complete/incomplete
    this.props.onButtonClick = (action?: string): void => {
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

    render(Dialog(this.props as DialogProps), rootElement);

    // step can be marked "complete" by config
    // in case you want to keep the container
    // visible and go to the next step
    if (this.props.complete) {
      this.complete = true;
    }

    // wait for complete variable to be set
    await this.isComplete();

    // finish up
    return this.finish();
  }
}

export default ShowDialogStep;
