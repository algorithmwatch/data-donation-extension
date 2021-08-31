import Step from './Step';

class OpenURLStep extends Step {
  async run(): Promise<ReturnType<Step['finish']>> {
    this.complete = true;
    return this.finish(() => {
      console.warn('setting url', this.props.url);
      window.location.href = this.props.url;
    });
  }
}

export default OpenURLStep;
