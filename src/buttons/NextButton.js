import React from 'react';

import SymbolButton from './SymbolButton';
import { BUTTON_SIZE, getDefaultStyle } from './util';

const NextButton = ({ isLight, ...rest }) => (
  <SymbolButton
    size={BUTTON_SIZE}
    textStyle={getDefaultStyle(isLight)}
    {...rest}
  >
    →
  </SymbolButton>
);

export default NextButton;
