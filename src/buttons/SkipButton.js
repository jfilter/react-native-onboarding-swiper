import React from 'react';

import TextButton from './TextButton';
import { BUTTON_SIZE, getDefaultStyle } from './util';

const SkipButton = ({ skipLabel, isLight, ...rest }) => (
  <TextButton size={BUTTON_SIZE} textStyle={getDefaultStyle(isLight)} {...rest}>
    {skipLabel}
  </TextButton>
);

export default SkipButton;
