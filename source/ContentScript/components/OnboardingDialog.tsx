/* eslint-disable jsx-a11y/click-events-have-key-events */
// import browser from 'webextension-polyfill';
import * as React from 'react';
import parse from 'html-react-parser';
import {OnboardingDialogProps, StepButton} from '../../types';
import Dialog from './Dialog';
import Logo from './Logo';

function OnboardingDialog({
  title,
  description,
  onCancel,
  onSubmit,
}: OnboardingDialogProps): React.ReactElement {
  const [contentIndex, setContentIndex] = React.useState(0);

  const onButtonClick = (action?: string): void => {
    if (action === 'cancel') {
      onCancel();
    }
  };

  if (contentIndex === 0) {
    const buttons: StepButton[] = [
      {
        label: 'Nicht mehr fragen',
        action: 'cancel',
        theme: 'secondary',
      },
    ];
    return (
      <Dialog
        buttons={buttons}
        onButtonClick={onButtonClick}
        className="aw-text-center aw-space-y-2"
      >
        <Logo className="aw-w-12 aw-h-12 aw-mt-1 mx-auto" />
        <div className="aw-space-y-4">
          <div style={{maxWidth: 220}} className="aw-mx-auto">
            Hilf uns auf dieser Website folgendes zu untersuchen:
          </div>
          <div
            className="aw-bg-orange-100 aw-rounded-xl aw-p-4 aw-cursor-pointer aw-border-4 aw-border-solid aw-border-transparent hover:aw-border-orange-400"
            onClick={(): void => setContentIndex(contentIndex + 1)}
          >
            {parse(title)}
          </div>
        </div>
      </Dialog>
    );
  }
  if (contentIndex === 1) {
    return (
      <Dialog>
        <div className="">{parse(description)}</div>
      </Dialog>
    );
  }

  return <div />;
}

export default OnboardingDialog;
