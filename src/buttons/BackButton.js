import React from 'react';

import TextButton from './TextButton';
import { BUTTON_SIZE, MARGIN_RIGHT, getDefaultStyle } from './util';

const BackButton = ({ backLabel, isLight, ...rest }) => (
  <TextButton
    size={BUTTON_SIZE}
    style={{ marginRight: MARGIN_RIGHT }}
    textStyle={getDefaultStyle(isLight)}
    {...rest}
  >
    {backLabel}
  </TextButton>
);

export default BackButton;
