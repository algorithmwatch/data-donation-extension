import * as React from 'react';
// import parse from 'html-react-parser';
import {DialogProps} from '../../types';
import Button from './DialogButton';

function Dialog({
  buttons,
  onButtonClick,
  children,
}: DialogProps): React.ReactElement {
  return (
    <div
      className="aw-bg-white aw-rounded-3xl aw-border-2 aw-border-brown-1000 aw-fixed aw-top-6 aw-right-6 aw-max-w-sm aw-p-4"
      style={{zIndex: 999999}}
    >
      <div className="aw-font-sans aw-text-lg">{children}</div>
      {buttons && (
        <div>
          {buttons.map((button) => (
            <Button
              key={button.label}
              theme={button.theme}
              classNames=""
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
