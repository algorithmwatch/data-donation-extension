import {StepProps} from '../../types';

class Step {
  name: string;

  props: StepProps;

  complete: null | boolean = null;

  data: {[key: string]: any} | null = null;

  constructor(name: string, props: StepProps = {}) {
    this.name = name;
    this.props = props;
  }

  async run(): Promise<ReturnType<Step['finish']>> {
    // run stuff
    return this.finish();
  }

  async isComplete(): Promise<void> {
    // wait until complete variable is set
    while (this.complete === null) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  finish(): {name: string; data: any; complete: boolean | null} {
    return {
      name: this.name,
      data: this.data,
      complete: this.complete,
    };
  }
}

export default Step;
