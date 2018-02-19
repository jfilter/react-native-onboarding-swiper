import React from 'react';

import SymbolButton from './SymbolButton';
import { BUTTON_SIZE, MARGIN_RIGHT, getDefaultStyle } from './util';

const NextButton = ({ isLight, ...rest }) => (
  <SymbolButton
    size={BUTTON_SIZE}
    textStyle={getDefaultStyle(isLight)}
    style={{
      margin: MARGIN_RIGHT,
    }}
    {...rest}
  >
    →
  </SymbolButton>
);

export default NextButton;
