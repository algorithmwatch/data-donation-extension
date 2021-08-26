import {ConfigStep, BackgroundStep} from '../types';

const createStep = ({name, ...props}: ConfigStep): BackgroundStep => ({
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
