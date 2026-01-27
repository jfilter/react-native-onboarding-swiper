import React from 'react';
import { render } from '@testing-library/react-native';

import Dots from '../Dots';
import Dot from '../Dot';

describe('Dots', () => {
  it('renders the correct number of dots', () => {
    const { toJSON } = render(
      <Dots isLight={false} numPages={5} currentPage={0} Dot={Dot} />
    );
    const container = toJSON();
    expect(container.children.length).toBe(5);
  });

  it('marks the current page dot as selected', () => {
    const CustomDot = ({ selected, isLight }) => {
      const React = require('react');
      const { Text } = require('react-native');
      return <Text testID={selected ? 'selected' : 'unselected'}>{selected ? 'S' : 'U'}</Text>;
    };
    const { getAllByTestId } = render(
      <Dots isLight={false} numPages={3} currentPage={1} Dot={CustomDot} />
    );
    const selected = getAllByTestId('selected');
    const unselected = getAllByTestId('unselected');
    expect(selected.length).toBe(1);
    expect(unselected.length).toBe(2);
  });

  it('renders with a custom Dot component', () => {
    const CustomDot = ({ selected }) => {
      const React = require('react');
      const { View } = require('react-native');
      return <View testID="custom-dot" />;
    };
    const { getAllByTestId } = render(
      <Dots isLight={false} numPages={4} currentPage={0} Dot={CustomDot} />
    );
    expect(getAllByTestId('custom-dot').length).toBe(4);
  });
});
