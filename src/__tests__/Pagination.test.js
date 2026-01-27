import React from 'react';
import { StatusBar } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import Pagination from '../Pagination';
import Dot from '../Dot';
import SkipButton from '../buttons/SkipButton';
import NextButton from '../buttons/NextButton';
import DoneButton from '../buttons/DoneButton';

const defaultProps = {
  numPages: 3,
  currentPage: 0,
  isLight: false,
  bottomBarHeight: 60,
  bottomBarColor: 'transparent',
  controlStatusBar: true,
  showSkip: true,
  showNext: true,
  showDone: true,
  onNext: jest.fn(),
  onSkip: jest.fn(),
  onDone: jest.fn(),
  skipLabel: 'Skip',
  nextLabel: 'Next',
  allowFontScaling: true,
  SkipButtonComponent: SkipButton,
  DoneButtonComponent: DoneButton,
  NextButtonComponent: NextButton,
  DotComponent: Dot,
};

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows Skip and Next on a non-last page', () => {
    const { getByText } = render(<Pagination {...defaultProps} currentPage={0} />);
    expect(getByText('Skip')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('shows Done button on the last page', () => {
    const { getByText } = render(
      <Pagination {...defaultProps} currentPage={2} />
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('does not show Skip on the last page', () => {
    const { queryByText } = render(
      <Pagination {...defaultProps} currentPage={2} />
    );
    expect(queryByText('Skip')).toBeNull();
  });

  it('does not show Next on the last page', () => {
    const { queryByText } = render(
      <Pagination {...defaultProps} currentPage={2} />
    );
    expect(queryByText('Next')).toBeNull();
  });

  it('hides Skip when showSkip is false', () => {
    const { queryByText } = render(
      <Pagination {...defaultProps} showSkip={false} />
    );
    expect(queryByText('Skip')).toBeNull();
  });

  it('hides Next when showNext is false', () => {
    const { queryByText } = render(
      <Pagination {...defaultProps} showNext={false} />
    );
    expect(queryByText('Next')).toBeNull();
  });

  it('hides Done when showDone is false', () => {
    const { queryByText } = render(
      <Pagination {...defaultProps} showDone={false} currentPage={2} />
    );
    expect(queryByText('✓')).toBeNull();
  });

  it('calls onSkip when Skip is pressed', () => {
    const onSkip = jest.fn();
    const { getByText } = render(
      <Pagination {...defaultProps} onSkip={onSkip} />
    );
    fireEvent.press(getByText('Skip'));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('calls onDone when Done is pressed', () => {
    const onDone = jest.fn();
    const { getByText } = render(
      <Pagination {...defaultProps} currentPage={2} onDone={onDone} />
    );
    fireEvent.press(getByText('✓'));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('passes doneLabel to DoneButtonComponent', () => {
    const { getByText, queryByText } = render(
      <Pagination {...defaultProps} currentPage={2} doneLabel="Finish" />
    );
    expect(getByText('Finish')).toBeTruthy();
    expect(queryByText('✓')).toBeNull();
  });

  it('renders checkmark when doneLabel is not provided', () => {
    const { getByText } = render(
      <Pagination {...defaultProps} currentPage={2} />
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('sets StatusBar to default on Skip when controlStatusBar is true', () => {
    const setBarStyleSpy = jest.spyOn(StatusBar, 'setBarStyle');
    const onSkip = jest.fn();
    const { getByText } = render(
      <Pagination {...defaultProps} controlStatusBar={true} onSkip={onSkip} />
    );
    fireEvent.press(getByText('Skip'));
    expect(setBarStyleSpy).toHaveBeenCalledWith('default', true);
    setBarStyleSpy.mockRestore();
  });
});
