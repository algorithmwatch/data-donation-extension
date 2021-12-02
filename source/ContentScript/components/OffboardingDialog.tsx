/* eslint-disable jsx-a11y/click-events-have-key-events */
// import browser from 'webextension-polyfill';
import * as React from 'react';
import parse from 'html-react-parser';
import {OffboardingDialogProps, StepButton} from '../../types';
import Dialog from './Dialog';

function OnboardingDialog({
  text1,
  text2,
  onCancel,
  onSubmit,
}: OffboardingDialogProps): React.ReactElement {
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
        label: 'Ja, gerne',
        action: 'next',
        theme: 'primary',
      },
      {
        label: 'Nein',
        action: 'cancel',
        theme: 'secondary',
      },
    ];
    return (
      <Dialog
        buttons={buttons}
        onButtonClick={onButtonClick}
        onCloseClick={(): void => onCancel()}
        className="aw-text-center aw-pt-8"
      >
        <div style={{maxWidth: 250}} className="aw-mx-auto aw-mb-4">
          {parse(text1)}
        </div>
      </Dialog>
    );
  }
  if (contentIndex === 1) {
    const buttons: StepButton[] = [
      {
        label: 'Schließen',
        action: 'cancel',
        theme: 'secondary',
      },
    ];
    return (
      <Dialog
        buttons={buttons}
        onButtonClick={onButtonClick}
        onCloseClick={(): void => onCancel()}
        className="aw-text-center aw-pt-8"
      >
        <div className="aw-mx-auto aw-mb-4" style={{maxWidth: 250}}>
          <div>{parse(text2)}</div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Deine E-Mail-Adresse"
              className="aw-font-sans aw-text-base aw-px-1 aw-py-2 aw-leading-none aw-text-brown-1000 aw-bg-white aw-border aw-border-solid aw-border-brown-1000 focus:aw-outline-none focus:aw-ring focus:aw-ring-orange-300"
            />
          </div>
        </div>
      </Dialog>
    );
  }

  return <div />;
}

export default OnboardingDialog;
