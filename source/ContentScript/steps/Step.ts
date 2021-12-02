import {StepProps} from '../../types';

class Step {
  name: string;

  props: StepProps;

  complete: null | boolean = null;

  data: {[key: string]: any} | null = null;

  dialogRootId = 'aw-extension-dialog-root';

  constructor(name: string, props: StepProps = {}) {
    this.name = name;
    this.props = props;
  }

  getDialogRoot(): HTMLElement {
    // check if react root exists already and create if not
    const rootElementId = this.dialogRootId;
    let rootElement = document.getElementById(this.dialogRootId);

    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = rootElementId;
      document.body.appendChild(rootElement);
    }

    return rootElement;
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

  saveData(data: this['data']): void {
    this.data = data;
  }

  finish(callback?: () => void): {
    name: string;
    data: any;
    complete: boolean | null;
    callback?: () => void;
  } {
    return {
      name: this.name,
      data: this.data,
      complete: this.complete,
      callback,
    };
  }
}

export default Step;
