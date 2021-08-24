import * as React from 'react';
import parse from 'html-react-parser';
import {StepProps} from '../../types';

function Container({html}: StepProps): React.ReactElement {
  return <div>{parse(html)}</div>;
}

export default Container;
