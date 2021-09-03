import Step from './Step';

class ExtractDataStep extends Step {
  async run(): Promise<ReturnType<Step['finish']>> {
    const rawHTML = document.documentElement.innerHTML;

    this.saveData({html: rawHTML});

    this.complete = true;

    // finish up
    return this.finish();
  }
}

export default ExtractDataStep;
