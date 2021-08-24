import cn from 'classnames';
import React, {MouseEvent, ReactNode} from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit';
  size?: 'small' | 'medium' | 'large';
  theme?: 'outline' | 'link' | 'yellow';
  // startIcon?: IconDefinition;
  // endIcon?: IconDefinition;
  classNames?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  children?: ReactNode;
}

export default function Button({
  type = 'button',
  size = 'medium',
  theme = 'yellow',
  // startIcon,
  // endIcon,
  classNames = '',
  disabled = false,
  onClick,
  children,
}: ButtonProps): React.ReactElement {
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
    medium: 'aw-px-5 aw-py-3 aw-text-lg aw-rounded-md',
    large: 'aw-px-6 aw-py-5 aw-text-xl',
  };

  const buttonTheme = {
    outline: cn({
      // 'border-2 text-yellow-1500': true,
      // 'border-yellow-700 hover:text-yellow-1200 focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50':
      //   !disabled,
      // 'border-yellow-1200 text-yellow-1200 opacity-50 border-opacity-50':
      //   disabled,
    }),
    link: cn(),
    // 'text-yellow-1500', {
    // 'hover:underline': !disabled,
    // 'opacity-20': disabled,
    // }
    yellow: cn('aw-border-2 aw-text-white', {
      'aw-border-yellow-400 aw-bg-yellow-500 aw-bg-opacity-10 hover:aw-bg-yellow-600 focus:aw-ring-4 focus:aw-ring-yellow-300 focus:aw-ring-opacity-50':
        !disabled,
    }),
  };

  const button = (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`aw-font-sans aw-inline-flex aw-flex-nowrap aw-items-center aw-justify-center aw-font-medium focus:aw-outline-none aw-leading-none aw-transition aw-duration-150 aw-ease-in-out ${buttonSize[size]} ${buttonTheme[theme]} ${classNames}`}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );

  return button;
}
