import * as React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import Step from './Step';
import OnboardingDialog from '../components/OnboardingDialog';
import InstructionDialog from '../components/InstructionDialog';
import OffboardingDialog from '../components/OffboardingDialog';

class ShowDialogStep extends Step {
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

    let component;
    const componentName = this.props.component;
    if (componentName === 'onboarding') {
      component = OnboardingDialog;
    } else if (componentName === 'instruction') {
      component = InstructionDialog;
    } else if (componentName === 'offboarding') {
      component = OffboardingDialog;
    } else {
      throw new Error('No valid component name specified');
    }

    this.props.onCancel = onCancel;
    this.props.onSubmit = onSubmit;

    render(React.createElement(component, this.props, null), rootElement);

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
