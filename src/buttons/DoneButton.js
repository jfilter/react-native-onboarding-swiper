import React from 'react';

import SymbolButton from './SymbolButton';
import { BUTTON_SIZE, getDefaultStyle } from './util';

const DoneButton = ({ isLight, ...rest }) => (
  <SymbolButton
    size={BUTTON_SIZE}
    textStyle={getDefaultStyle(isLight)}
    style={{
      borderRadius: BUTTON_SIZE / 2,
      backgroundColor: 'rgba(255, 255, 255, 0.10)',
    }}
    {...rest}
  >
    ✓
  </SymbolButton>
);

export default DoneButton;
