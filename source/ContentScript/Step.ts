import {StepProps} from '../types';

class Step {
  name: string;

  props: StepProps;

  data: {[key: string]: any} | null;

  constructor(name: string, props: StepProps = {}) {
    this.name = name;
    this.props = props;
    this.data = null;
  }

  async run(): Promise<ReturnType<Step['finish']>> {
    // run stuff
    return this.finish();
  }

  beforeFinish(): void {}

  finish(): {data: any} {
    this.beforeFinish();

    return {
      data: this.data,
    };
  }
}

export default Step;
