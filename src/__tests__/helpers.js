import React from 'react';
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
 * Simulate a swipe to a specific page by invoking onViewableItemsChanged
 * on a FlatList instance.
 * @param {Object} flatList - FlatList RNTL element
 * @param {number} pageIndex - Target page index
 * @param {Array} pages - The pages data array
 */
export const simulateSwipeTo = (flatList, pageIndex, pages) => {
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
};
