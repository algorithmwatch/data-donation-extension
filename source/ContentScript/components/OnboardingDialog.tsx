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
    if (action === 'submit') {
      onSubmit();
    } else if (action === 'cancel') {
      onCancel();
    } else if (action === 'next') {
      setContentIndex(contentIndex + 1);
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
      <Dialog buttons={buttons} onButtonClick={onButtonClick}>
        <div className="">
          <Logo className="aw-w-12 aw-h-12" />
        </div>
        <div className="aw-text-center">{parse(title)}</div>
      </Dialog>
    );
  }
  if (contentIndex === 1) {
    return (
      <Dialog>
        <div className="aw-text-center">{parse(description)}</div>
      </Dialog>
    );
  }

  return <div />;
}

export default OnboardingDialog;
