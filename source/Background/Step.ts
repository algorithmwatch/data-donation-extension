import {cloneDeep} from 'lodash';
import {StepModel, Step} from '../types';

const createStep = (stepModel: StepModel): Step => ({
  ...cloneDeep(stepModel),
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
