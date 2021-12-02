import * as React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import Step from './Step';
import OnboardingDialog from '../components/OnboardingDialog';

class ShowOnboardingDialogStep extends Step {
  async run(): Promise<ReturnType<Step['finish']>> {
    const rootElement = this.getDialogRoot();

    const unmount = (): void => {
      // unmount component
      if (rootElement) {
        unmountComponentAtNode(rootElement);
      }
    };
    const onCancel = (): void => {
      this.complete = false;
      unmount();
    };
    const onSubmit = (): void => {
      this.complete = true;
      unmount();
    };

    this.props.onCancel = onCancel;
    this.props.onSubmit = onSubmit;

    render(
      React.createElement(OnboardingDialog, this.props, null),
      rootElement
    );

    // wait for complete variable to be set
    await this.isComplete();

    // finish up
    return this.finish();
  }
}

export default ShowOnboardingDialogStep;
