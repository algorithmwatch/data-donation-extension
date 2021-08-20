export interface ConfigStep {
  name: string;
  someprop: string;
}

export interface Config {
  name: string;
  steps: ConfigStep[];
}

export interface BackgroundStep {
  isComplete: boolean;
  run: () => void;
}

// export interface Step {
//   createBackgroundStep: (config: any) => BackgroundStep;
// }
