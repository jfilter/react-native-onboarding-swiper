import React from 'react';
import { act } from '@testing-library/react-native';
import { View } from 'react-native';

/**
 * Factory to create test page data for Onboarding component.
 * @param {number} count - Number of pages to create
 * @returns {Array} Array of page objects
 */
export const createTestPages = (count) =>
  Array.from({ length: count }, (_, i) => ({
    backgroundColor: i % 2 === 0 ? '#fff' : '#000',
    image: <View testID={`image-${i}`} />,
    title: `Title ${i}`,
    subtitle: `Subtitle ${i}`,
  }));

/**
 * Factory to create test pages using custom background elements instead of backgroundColor.
 * @param {number} count - Number of pages to create
 * @returns {Array} Array of page objects with background and isLight
 */
export const createTestPagesWithBackground = (count) =>
  Array.from({ length: count }, (_, i) => ({
    background: <View testID={`gradient-${i}`} />,
    isLight: i % 2 === 0,
    image: <View testID={`image-${i}`} />,
    title: `Title ${i}`,
    subtitle: `Subtitle ${i}`,
  }));

/**
 * Factory to create a mix of backgroundColor-only, background-only, and both pages.
 * @returns {Array} Array of 3 mixed page objects
 */
export const createMixedTestPages = () => [
  {
    backgroundColor: '#fff',
    image: <View testID="image-0" />,
    title: 'Title 0',
    subtitle: 'Subtitle 0',
  },
  {
    background: <View testID="gradient-1" />,
    isLight: false,
    image: <View testID="image-1" />,
    title: 'Title 1',
    subtitle: 'Subtitle 1',
  },
  {
    backgroundColor: '#003c8f',
    background: <View testID="gradient-2" />,
    image: <View testID="image-2" />,
    title: 'Title 2',
    subtitle: 'Subtitle 2',
  },
];

/**
 * Simulate a swipe to a specific page by invoking onViewableItemsChanged
 * on a FlatList instance.
 * @param {Object} flatList - FlatList RNTL element
 * @param {number} pageIndex - Target page index
 * @param {Array} pages - The pages data array
 */
export const simulateSwipeTo = (flatList, pageIndex, pages) => {
  act(() => {
    flatList.props.onViewableItemsChanged({
      viewableItems: [
        {
          index: pageIndex,
          isViewable: true,
          item: pages[pageIndex],
          key: String(pageIndex),
        },
      ],
      changed: [],
    });
  });
};
