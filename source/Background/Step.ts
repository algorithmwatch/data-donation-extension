import {StepModel, Step} from '../types';

const createStep = ({name, ...props}: StepModel): Step => ({
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
