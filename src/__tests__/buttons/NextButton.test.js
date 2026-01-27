import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import NextButton from '../../buttons/NextButton';

describe('NextButton', () => {
  it('renders the next label text', () => {
    const { getByText } = render(
      <NextButton nextLabel="Next" isLight={false} onPress={() => {}} />
    );
    expect(getByText('Next')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <NextButton nextLabel="Next" isLight={false} onPress={onPress} />
    );
    fireEvent.press(getByText('Next'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
