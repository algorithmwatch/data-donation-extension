import {StepProps} from '../types';

class Step {
  name: string;

  props: StepProps;

  constructor(name: string, props: StepProps = {}) {
    this.name = name;
    this.props = props;

    this.run();
  }

  async run(): Promise<void> {
    // run stuff
  }
}

export default Step;
