import React from 'react';
import { Animated } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import DoneButton from '../../buttons/DoneButton';

describe('DoneButton', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the checkmark symbol', () => {
    const { getByText } = render(
      <DoneButton isLight={false} onPress={() => {}} />
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('starts with opacity 0', () => {
    const { toJSON } = render(
      <DoneButton isLight={false} onPress={() => {}} />
    );
    const animatedView = toJSON();
    // The Animated.View wraps the SymbolButton; opacity starts at 0
    expect(animatedView.props.style.opacity).toBe(0);
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <DoneButton isLight={false} onPress={onPress} />
    );
    fireEvent.press(getByText('✓'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('triggers animation after delay', () => {
    const mockStart = jest.fn();
    const timingSpy = jest.spyOn(Animated, 'timing').mockReturnValue({
      start: mockStart,
      stop: jest.fn(),
      reset: jest.fn(),
    });

    render(<DoneButton isLight={false} onPress={() => {}} />);

    // The setTimeout in componentDidMount fires after 1000ms
    jest.runOnlyPendingTimers();

    expect(timingSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    expect(mockStart).toHaveBeenCalled();

    timingSpy.mockRestore();
  });
});
