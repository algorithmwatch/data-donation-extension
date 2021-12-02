import * as React from 'react';
import cn from 'classnames';
import {DialogButton} from '../../types';

export default function Button({
  type = 'button',
  size = 'medium',
  theme = 'primary',
  // startIcon,
  // endIcon,
  classNames = '',
  disabled = false,
  onClick,
  children,
}: DialogButton): React.ReactElement {
  // set button content
  const buttonContent = [];

  // if (startIcon) {
  //   buttonContent.push(
  //     <span key="start-icon" className={size === 'large' ? 'mr-2.5' : 'mr-2'}>
  //       <FontAwesomeIcon icon={startIcon} />
  //     </span>,
  //   );
  // }

  buttonContent.push(
    <span key="content" className="aw-select-none">
      {children}
    </span>
  );

  // if (endIcon) {
  //   buttonContent.push(
  //     <span key="end-icon" className={size === 'large' ? 'ml-2.5' : 'ml-2'}>
  //       <FontAwesomeIcon icon={endIcon} />
  //     </span>,
  //   );
  // }

  // set button classes

  const buttonSize = {
    small: 'aw-px-3 aw-py-2.5 aw-text-sm',
    medium: 'aw-px-5 aw-py-3 aw-text-base',
    large: 'aw-px-6 aw-py-5 aw-text-xl',
  };

  const buttonTheme = {
    secondary: cn('aw-text-brown-1000 aw-bg-transparent aw-border-none'),
    primary: cn('aw-border-2 aw-text-brown-1000', {
      'aw-border-yellow-400 aw-bg-yellow-500 aw-bg-opacity-10 hover:aw-bg-yellow-600 focus:aw-ring-4 focus:aw-ring-yellow-300 focus:aw-ring-opacity-50':
        !disabled,
    }),
  };

  const button = (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`aw-font-sans aw-cursor-pointer aw-inline-flex aw-flex-nowrap aw-items-center aw-justify-center aw-font-medium focus:aw-outline-none aw-leading-none aw-transition aw-duration-150 aw-ease-in-out ${buttonSize[size]} ${buttonTheme[theme]} ${classNames}`}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );

  return button;
}
