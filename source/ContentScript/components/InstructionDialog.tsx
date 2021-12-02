/* eslint-disable jsx-a11y/click-events-have-key-events */
// import browser from 'webextension-polyfill';
import * as React from 'react';
import parse from 'html-react-parser';
import {InstructionDialogProps} from '../../types';
import Dialog from './Dialog';

function InstructionDialog({
  description,
}: InstructionDialogProps): React.ReactElement {
  return (
    <Dialog showCloseButton={false} className="aw-text-center">
      <div className="">{parse(description)}</div>
    </Dialog>
  );
}

export default InstructionDialog;
