import {StepHandler, StepProps} from '../types';

const createStepHandler = (
  name: string,
  props: StepProps = {}
): StepHandler => ({
  name,
  props,
});

export default createStepHandler;
