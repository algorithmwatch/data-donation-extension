import {StepHandler, Config, HandleStepResult, BackgroundStep} from '../types';
import createStep from './Step';

const createStepHandler = ({steps}: Config): StepHandler => ({
  steps: steps.map((s) => createStep(s)),
  currentStepIndex: 0,

  handleStep({name, complete, data}): HandleStepResult {
    console.warn('Handling step', {name, complete, data});
    const currentStep = this.getCurrentStep();
    const result: HandleStepResult = {
      nextStep: null,
      allStepsComplete: this.steps.length - 1 === this.currentStepIndex,
    };

    // Map incoming step name with current step and return empty result if unsuccessful
    if (currentStep.name !== name) {
      console.debug(
        `Step "${name}" not a current step (current step is "${currentStep.name}")`
      );
      console.debug(this);
      return result;
    }

    // Append data to step if provided
    if (data) {
      currentStep.saveData(data);
    }

    // If step is complete, increase step index and add next step name to result.
    if (complete === true && !result.allStepsComplete) {
      this.setNextStepIndex();
      const nextStep = this.getCurrentStep();
      result.nextStep = {
        name: nextStep.name,
        props: nextStep.props,
      };
    }

    return result;
  },

  getCurrentStep(): BackgroundStep {
    return this.steps[this.currentStepIndex];
  },

  setNextStepIndex(): void {
    const nextIndex = this.currentStepIndex + 1;
    this.currentStepIndex =
      nextIndex >= this.steps.length ? this.currentStepIndex : nextIndex;
  },
});

export default createStepHandler;
