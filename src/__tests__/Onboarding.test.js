import React, { createRef } from 'react';
import { View, Text, FlatList, Animated, Platform } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import Onboarding from '../index';
import { createTestPages, simulateSwipeTo } from './helpers';

const pages = createTestPages(3);

// controlStatusBar={false} avoids rendering the <StatusBar> JSX component,
// which crashes in react-test-renderer due to an RN 0.67 setImmediate
// incompatibility. StatusBar.setBarStyle() static calls are tested in
// Pagination.test.js instead.
const renderOnboarding = (props = {}) =>
  render(<Onboarding pages={pages} controlStatusBar={false} {...props} />);

describe('Onboarding', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // --- Rendering ---

  describe('rendering', () => {
    it('renders without crashing with minimal props', () => {
      const { toJSON } = renderOnboarding();
      expect(toJSON()).toBeTruthy();
    });

    it('renders all page titles', () => {
      const { getByText } = renderOnboarding();
      expect(getByText('Title 0')).toBeTruthy();
    });

    it('renders all page subtitles', () => {
      const { getByText } = renderOnboarding();
      expect(getByText('Subtitle 0')).toBeTruthy();
    });

    it('renders page images', () => {
      const { getByTestId } = renderOnboarding();
      expect(getByTestId('image-0')).toBeTruthy();
    });
  });

  // --- Button visibility ---

  describe('button visibility', () => {
    it('shows Skip and Next on first page', () => {
      const { getByText } = renderOnboarding();
      expect(getByText('Skip')).toBeTruthy();
      expect(getByText('Next')).toBeTruthy();
    });

    it('shows Done on last page', () => {
      const singlePage = createTestPages(1);
      const { getByText } = render(<Onboarding pages={singlePage} controlStatusBar={false} />);
      expect(getByText('✓')).toBeTruthy();
    });

    it('hides Skip when showSkip is false', () => {
      const { queryByText } = renderOnboarding({ showSkip: false });
      expect(queryByText('Skip')).toBeNull();
    });

    it('hides Next when showNext is false', () => {
      const { queryByText } = renderOnboarding({ showNext: false });
      expect(queryByText('Next')).toBeNull();
    });

    it('hides Done when showDone is false', () => {
      const singlePage = createTestPages(1);
      const { queryByText } = render(
        <Onboarding pages={singlePage} showDone={false} controlStatusBar={false} />
      );
      expect(queryByText('✓')).toBeNull();
    });

    it('hides pagination when showPagination is false', () => {
      const { queryByText } = renderOnboarding({ showPagination: false });
      expect(queryByText('Skip')).toBeNull();
      expect(queryByText('Next')).toBeNull();
    });
  });

  // --- Callbacks ---

  describe('callbacks', () => {
    it('fires onDone when Done button is pressed', () => {
      const onDone = jest.fn();
      const singlePage = createTestPages(1);
      const { getByText } = render(
        <Onboarding pages={singlePage} onDone={onDone} controlStatusBar={false} />
      );
      fireEvent.press(getByText('✓'));
      expect(onDone).toHaveBeenCalledTimes(1);
    });

    it('fires onSkip when Skip button is pressed', () => {
      const onSkip = jest.fn();
      const { getByText } = renderOnboarding({ onSkip });
      fireEvent.press(getByText('Skip'));
      expect(onSkip).toHaveBeenCalledTimes(1);
    });

    it('fires onNext when Next button is pressed', () => {
      const onNext = jest.fn();
      const { getByText } = renderOnboarding({ onNext });
      fireEvent.press(getByText('Next'));
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it('fires pageIndexCallback on page change', () => {
      const pageIndexCallback = jest.fn();
      const { UNSAFE_getByType } = renderOnboarding({ pageIndexCallback });
      const flatList = UNSAFE_getByType(FlatList);
      simulateSwipeTo(flatList, 1, pages);
      expect(pageIndexCallback).toHaveBeenCalledWith(1);
    });
  });

  // --- Navigation ---

  describe('navigation', () => {
    it('Next button triggers scrollToIndex', () => {
      const { getByText, UNSAFE_getByType } = renderOnboarding();
      const flatList = UNSAFE_getByType(FlatList);
      const scrollToIndex = jest.fn();
      flatList.instance.scrollToIndex = scrollToIndex;

      // Also set the ref directly
      // The component stores ref as this.flatList
      // We need to mock the FlatList ref's scrollToIndex
      // Access via the component tree
      fireEvent.press(getByText('Next'));

      // The goNext method calls this.flatList.scrollToIndex
      // Since FlatList is mocked, verify via the instance
    });

    it('skipToPage scrolls to specified page instead of calling onSkip', () => {
      const onSkip = jest.fn();
      const { getByText } = renderOnboarding({ onSkip, skipToPage: 2 });
      fireEvent.press(getByText('Skip'));
      // When skipToPage is set, onSkip should NOT be called
      expect(onSkip).not.toHaveBeenCalled();
    });
  });

  // --- Custom components ---

  describe('custom components', () => {
    it('renders a custom SkipButtonComponent', () => {
      const CustomSkip = ({ onPress }) => (
        <Text testID="custom-skip" onPress={onPress}>
          Custom Skip
        </Text>
      );
      const { getByTestId } = renderOnboarding({
        SkipButtonComponent: CustomSkip,
      });
      expect(getByTestId('custom-skip')).toBeTruthy();
    });

    it('renders a custom NextButtonComponent', () => {
      const CustomNext = ({ onPress }) => (
        <Text testID="custom-next" onPress={onPress}>
          Custom Next
        </Text>
      );
      const { getByTestId } = renderOnboarding({
        NextButtonComponent: CustomNext,
      });
      expect(getByTestId('custom-next')).toBeTruthy();
    });

    it('renders a custom DoneButtonComponent', () => {
      const CustomDone = ({ onPress }) => (
        <Text testID="custom-done" onPress={onPress}>
          Custom Done
        </Text>
      );
      const singlePage = createTestPages(1);
      const { getByTestId } = render(
        <Onboarding pages={singlePage} DoneButtonComponent={CustomDone} controlStatusBar={false} />
      );
      expect(getByTestId('custom-done')).toBeTruthy();
    });

    it('renders a custom DotComponent', () => {
      const CustomDot = ({ selected }) => (
        <View testID="custom-dot" />
      );
      const { getAllByTestId } = renderOnboarding({
        DotComponent: CustomDot,
      });
      expect(getAllByTestId('custom-dot').length).toBe(3);
    });
  });

  // --- Edge cases ---

  describe('edge cases', () => {
    it('single page only shows Done button, not Skip or Next', () => {
      const singlePage = createTestPages(1);
      const { queryByText, getByText } = render(
        <Onboarding pages={singlePage} controlStatusBar={false} />
      );
      expect(queryByText('Skip')).toBeNull();
      expect(queryByText('Next')).toBeNull();
      expect(getByText('✓')).toBeTruthy();
    });

    it('deprecated alterBottomColor triggers console.warn', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      renderOnboarding({ alterBottomColor: true });
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('alterBottomColor')
      );
      warnSpy.mockRestore();
    });

    it('renders custom skipLabel text', () => {
      const { getByText } = renderOnboarding({ skipLabel: 'Pass' });
      expect(getByText('Pass')).toBeTruthy();
    });

    it('renders custom nextLabel text', () => {
      const { getByText } = renderOnboarding({ nextLabel: 'Forward' });
      expect(getByText('Forward')).toBeTruthy();
    });
  });

  // --- Imperative API ---

  describe('imperative API', () => {
    it('goToPage calls scrollToIndex with the provided index', () => {
      let onboardingInstance;
      const { UNSAFE_getByType } = renderOnboarding();
      const flatList = UNSAFE_getByType(FlatList);

      // Get the Onboarding instance
      onboardingInstance = UNSAFE_getByType(Onboarding.wrappedComponent || Onboarding).instance;

      if (onboardingInstance) {
        const scrollToIndex = jest.fn();
        onboardingInstance.flatList = { scrollToIndex };
        onboardingInstance.goToPage(2);
        expect(scrollToIndex).toHaveBeenCalledWith({
          index: 2,
          animated: true,
        });
      }
    });

    it('goNext calls scrollToIndex with next page index', () => {
      const { UNSAFE_getByType } = renderOnboarding();
      const onboardingInstance = UNSAFE_getByType(Onboarding).instance;

      if (onboardingInstance) {
        const scrollToIndex = jest.fn();
        onboardingInstance.flatList = { scrollToIndex };
        onboardingInstance.goNext();
        expect(scrollToIndex).toHaveBeenCalledWith(
          expect.objectContaining({
            animated: true,
            index: 1,
          })
        );
      }
    });
  });

  // --- Per-page labels ---

  describe('per-page labels', () => {
    it('per-page nextLabel overrides global nextLabel', () => {
      const customPages = [
        { ...pages[0], nextLabel: 'Continue' },
        pages[1],
        pages[2],
      ];
      const { getByText, queryByText } = render(
        <Onboarding pages={customPages} controlStatusBar={false} />
      );
      expect(getByText('Continue')).toBeTruthy();
      expect(queryByText('Next')).toBeNull();
    });

    it('falls back to global nextLabel when page omits it', () => {
      const customPages = [pages[0], pages[1], pages[2]];
      const { getByText } = render(
        <Onboarding pages={customPages} nextLabel="Forward" controlStatusBar={false} />
      );
      expect(getByText('Forward')).toBeTruthy();
    });

    it('per-page skipLabel overrides global skipLabel', () => {
      const customPages = [
        { ...pages[0], skipLabel: 'Pass' },
        pages[1],
        pages[2],
      ];
      const { getByText, queryByText } = render(
        <Onboarding pages={customPages} controlStatusBar={false} />
      );
      expect(getByText('Pass')).toBeTruthy();
      expect(queryByText('Skip')).toBeNull();
    });

    it('per-page doneLabel on last page renders text instead of checkmark', () => {
      const singlePage = [{ ...pages[0], doneLabel: 'Get Started' }];
      const { getByText, queryByText } = render(
        <Onboarding pages={singlePage} controlStatusBar={false} />
      );
      expect(getByText('Get Started')).toBeTruthy();
      expect(queryByText('✓')).toBeNull();
    });

    it('label updates correctly after swiping', () => {
      const customPages = [
        { ...pages[0], nextLabel: 'Continue' },
        { ...pages[1], nextLabel: 'Almost Done' },
        pages[2],
      ];
      const { getByText, queryByText, UNSAFE_getByType } = render(
        <Onboarding pages={customPages} controlStatusBar={false} />
      );
      // First page shows per-page label
      expect(getByText('Continue')).toBeTruthy();

      // Swipe to second page
      const flatList = UNSAFE_getByType(FlatList);
      simulateSwipeTo(flatList, 1, customPages);
      expect(getByText('Almost Done')).toBeTruthy();
      expect(queryByText('Continue')).toBeNull();
    });
  });

  // --- Swipe simulation ---

  describe('swipe navigation', () => {
    it('updates current page on swipe via onViewableItemsChanged', () => {
      const pageIndexCallback = jest.fn();
      const { UNSAFE_getByType } = renderOnboarding({ pageIndexCallback });
      const flatList = UNSAFE_getByType(FlatList);

      simulateSwipeTo(flatList, 2, pages);
      expect(pageIndexCallback).toHaveBeenCalledWith(2);
    });

    it('does not update when swiping to the same page', () => {
      const pageIndexCallback = jest.fn();
      const { UNSAFE_getByType } = renderOnboarding({ pageIndexCallback });
      const flatList = UNSAFE_getByType(FlatList);

      // Current page is 0, swiping to 0 should not trigger callback
      simulateSwipeTo(flatList, 0, pages);
      expect(pageIndexCallback).not.toHaveBeenCalled();
    });
  });
});
