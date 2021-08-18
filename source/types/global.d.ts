export interface BackgroundStep {
  isComplete: boolean;
  run: () => void;
}

export interface Step {
  createBackgroundStep: (config: any) => BackgroundStep;
}
