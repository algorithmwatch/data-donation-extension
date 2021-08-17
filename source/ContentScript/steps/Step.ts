/**
 * Abstract class
 */
export class Step {
  constructor() {}

  run(): Error {
    throw new Error('Method is not implemented');
  }

  stop(): Error {
    throw new Error('Method is not implemented');
  }

  get isComplete(): Error {
    throw new Error('Method is not implemented');
  }
}
