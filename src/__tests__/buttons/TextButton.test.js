import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import TextButton from '../../buttons/TextButton';

describe('TextButton', () => {
  it('renders children text', () => {
    const { getByText } = render(
      <TextButton size={40} onPress={() => {}}>
        Press Me
      </TextButton>
    );
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TextButton size={40} onPress={onPress}>
        Press Me
      </TextButton>
    );
    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('respects allowFontScaling prop', () => {
    const { getByText } = render(
      <TextButton size={40} onPress={() => {}} allowFontScaling={false}>
        No Scale
      </TextButton>
    );
    expect(getByText('No Scale').props.allowFontScaling).toBe(false);
  });
});
