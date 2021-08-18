import {Step} from '../types/global';

const doSomething: Step = {
  createBackgroundStep: (config) => ({
    isComplete: false,
    run(): void {
      console.warn('running background step "doSomething"', config);
      this.isComplete = true;
    },
  }),
};

export default doSomething;
