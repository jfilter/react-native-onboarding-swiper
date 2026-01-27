import React from 'react';
import { View, Text } from 'react-native';
import { render } from '@testing-library/react-native';

import Page from '../Page';

const defaultProps = {
  isLight: false,
  image: <View testID="test-image" />,
  title: 'Test Title',
  subtitle: 'Test Subtitle',
  width: 375,
  height: 812,
};

describe('Page', () => {
  it('renders a string title as a Text element', () => {
    const { getByText } = render(<Page {...defaultProps} />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders a string subtitle as a Text element', () => {
    const { getByText } = render(<Page {...defaultProps} />);
    expect(getByText('Test Subtitle')).toBeTruthy();
  });

  it('renders an element title directly', () => {
    const customTitle = <Text testID="custom-title">Custom</Text>;
    const { getByTestId } = render(
      <Page {...defaultProps} title={customTitle} />
    );
    expect(getByTestId('custom-title')).toBeTruthy();
  });

  it('renders an element subtitle directly', () => {
    const customSubtitle = <Text testID="custom-subtitle">Custom Sub</Text>;
    const { getByTestId } = render(
      <Page {...defaultProps} subtitle={customSubtitle} />
    );
    expect(getByTestId('custom-subtitle')).toBeTruthy();
  });

  it('uses light text colors on dark background (isLight=false)', () => {
    const { getByText } = render(<Page {...defaultProps} isLight={false} />);
    const titleEl = getByText('Test Title');
    // On dark bg, title should use default white color (#fff)
    const flatStyle = Array.isArray(titleEl.props.style)
      ? Object.assign({}, ...titleEl.props.style.filter(Boolean))
      : titleEl.props.style;
    expect(flatStyle.color).toBe('#fff');
  });

  it('uses dark text colors on light background (isLight=true)', () => {
    const { getByText } = render(<Page {...defaultProps} isLight={true} />);
    const titleEl = getByText('Test Title');
    const flatStyle = Array.isArray(titleEl.props.style)
      ? Object.assign({}, ...titleEl.props.style.filter(Boolean))
      : titleEl.props.style;
    expect(flatStyle.color).toBe('#000');
  });
});
