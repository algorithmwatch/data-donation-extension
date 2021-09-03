import {ConfigStep, BackgroundStep} from '../types';

const createStep = ({name, ...props}: ConfigStep): BackgroundStep => ({
  name,
  props,
  data: null,

  saveData(data): void {
    this.data = data;
  },
});

export default createStep;
