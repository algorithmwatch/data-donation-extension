import * as React from 'react';
import parse from 'html-react-parser';
import {InstructionContainerProps} from '../../types';
import Button from './InstructionContainerButton';

function InstructionContainer({
  html,
  buttons,
  onButtonClick,
}: InstructionContainerProps): React.ReactElement {
  return (
    <div
      className="aw-bg-blue-600 aw-fixed aw-top-6 aw-right-6 aw-max-w-sm aw-p-4"
      style={{zIndex: 999999}}
    >
      <div className="aw-instruction-container-content">{parse(html)}</div>
      {buttons && (
        <div>
          {buttons.map((button) => (
            <Button
              key={button.label}
              theme={button.theme}
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

export default InstructionContainer;
