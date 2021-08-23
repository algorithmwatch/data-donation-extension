import {Config, ConfigModel, HandleStepResult, Step} from '../types';
import createStep from './Step';

const createConfig = ({name, matches, steps}: ConfigModel): Config => ({
  name,
  matches,
  steps: steps.map((s) => createStep(s)),
  currentStepIndex: 0,

  handleStep({name: stepName, completed, data}): HandleStepResult {
    console.warn('Handling step', {stepName, completed, data});
    const currentStep = this.getCurrentStep();
    const result: HandleStepResult = {
      nextStepName: null,
      allStepsCompleted: this.steps.length - 1 === this.currentStepIndex,
    };

    // Map step name with current step and return empty result if unsuccessful
    if (currentStep.name !== stepName) {
      console.debug(
        `Step "${stepName}" not a current step in config "${this.name}" (current step is "${currentStep.name}")`
      );
      return result;
    }

    // Append data to step if provided
    if (data) {
      currentStep.saveData(data);
    }

    // If step is completed, increase step index and add next step name to result.
    if (completed === true) {
      this.setNextStepIndex();
      result.nextStepName = this.getCurrentStep().name;
    }

    return result;
  },

  getCurrentStep(): Step {
    return this.steps[this.currentStepIndex];
  },

  setNextStepIndex(): void {
    const nextIndex = this.currentStepIndex + 1;
    this.currentStepIndex =
      nextIndex >= this.steps.length ? this.currentStepIndex : nextIndex;
  },
});

export default createConfig;
