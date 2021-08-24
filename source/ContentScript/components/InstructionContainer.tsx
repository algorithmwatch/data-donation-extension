import * as React from 'react';
import parse from 'html-react-parser';
import {StepProps} from '../../types';
import Button from './Button';

function InstructionContainer({html}: StepProps): React.ReactElement {
  return (
    <div
      className="aw-bg-blue-600 aw-fixed aw-top-6 aw-right-6 aw-max-w-sm aw-p-4"
      style={{zIndex: 999999}}
    >
      <div className="aw-instruction-container-content">{parse(html)}</div>
      <div>
        <Button>Verstanden</Button>
      </div>
    </div>
  );
}

export default InstructionContainer;
