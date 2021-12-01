import * as React from 'react';
import parse from 'html-react-parser';
import {DialogProps} from '../../types';
import Button from './DialogButton';

function Dialog({
  html,
  buttons,
  onButtonClick,
}: DialogProps): React.ReactElement {
  return (
    <div
      className="aw-bg-blue-600 aw-rounded aw-fixed aw-top-6 aw-right-6 aw-max-w-sm aw-p-4"
      style={{zIndex: 999999}}
    >
      <div className="aw-dialog-content">{parse(html)}</div>
      {buttons && (
        <div>
          {buttons.map((button) => (
            <Button
              key={button.label}
              theme={button.theme}
              classNames="aw-mr-4"
              onClick={(): void =>
                onButtonClick && onButtonClick(button.action)
              }
            >
              {button.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dialog;
