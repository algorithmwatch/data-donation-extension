import * as React from 'react';
// import parse from 'html-react-parser';
import {DialogProps} from '../../types';
import Button from './DialogButton';

function Dialog({
  buttons,
  onButtonClick,
  className = '',
  children,
}: DialogProps): React.ReactElement {
  return (
    <div
      className={`aw-bg-white aw-rounded-3xl aw-border aw-border-solid aw-border-brown-1000 aw-font-sans aw-text-base aw-text-brown-1000 aw-fixed aw-top-6 aw-right-6 aw-max-w-xs aw-p-4 aw-shadow-dialog ${className}`}
      style={{zIndex: 999999}}
    >
      <button
        type="button"
        className="aw-absolute aw-top-4 aw-right-4 aw-rounded-full aw-bg-orange-100"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.66509 6.87181L13.4702 3.0667C13.9371 2.59976 13.9371 1.84269 13.4702 1.37537L12.6245 0.52971C12.1576 0.0627693 11.4005 0.0627693 10.9332 0.52971L7.1281 4.33482L3.32299 0.52971C2.85605 0.0627693 2.09898 0.0627693 1.63166 0.52971L0.785996 1.37537C0.319056 1.84231 0.319056 2.59938 0.785996 3.0667L4.59111 6.87181L0.785996 10.6769C0.319056 11.1439 0.319056 11.9009 0.785996 12.3682L1.63166 13.2139C2.0986 13.6809 2.85605 13.6809 3.32299 13.2139L7.1281 9.4088L10.9332 13.2139C11.4001 13.6809 12.1576 13.6809 12.6245 13.2139L13.4702 12.3682C13.9371 11.9013 13.9371 11.1442 13.4702 10.6769L9.66509 6.87181Z"
            fill="#312509"
          />
        </svg>
      </button>
      {children}
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
