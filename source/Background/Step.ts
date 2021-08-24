import {StepModel, BackgroundStep} from '../types';

const createStep = ({name, ...props}: StepModel): BackgroundStep => ({
  name,
  props,
  data: null,

  saveData(data): void {
    if (!this.data) {
      this.data = data;
    } else {
      this.data = [...this.data, data];
    }
  },
});

export default createStep;
