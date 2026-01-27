import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import SymbolButton from '../../buttons/SymbolButton';

describe('SymbolButton', () => {
  it('renders the symbol character', () => {
    const { getByText } = render(
      <SymbolButton size={40} onPress={() => {}}>
        ✓
      </SymbolButton>
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SymbolButton size={40} onPress={onPress}>
        ✓
      </SymbolButton>
    );
    fireEvent.press(getByText('✓'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies the given size to the container', () => {
    const { toJSON } = render(
      <SymbolButton size={50} onPress={() => {}}>
        ✓
      </SymbolButton>
    );
    const container = toJSON();
    expect(container.props.style.width).toBe(50);
    expect(container.props.style.height).toBe(50);
  });
});
