import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import SkipButton from '../../buttons/SkipButton';

describe('SkipButton', () => {
  it('renders the skip label text', () => {
    const { getByText } = render(
      <SkipButton skipLabel="Skip" isLight={false} onPress={() => {}} />
    );
    expect(getByText('Skip')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SkipButton skipLabel="Skip" isLight={false} onPress={onPress} />
    );
    fireEvent.press(getByText('Skip'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
