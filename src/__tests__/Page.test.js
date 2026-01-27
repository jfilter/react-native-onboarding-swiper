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

  it('renders background element when provided', () => {
    const bg = <View testID="custom-bg" />;
    const { getByTestId } = render(<Page {...defaultProps} background={bg} />);
    expect(getByTestId('custom-bg')).toBeTruthy();
  });

  it('does not render background wrapper when background is absent', () => {
    const { toJSON } = render(<Page {...defaultProps} />);
    // The root View's first child should be the image container, not a background wrapper
    const root = toJSON();
    // First child should be the image container View (contains the image)
    expect(root.children[0].props.testID).toBeUndefined();
    // The image should be directly in the first child
    expect(root.children[0].children[0].props.testID).toBe('test-image');
  });

  it('background appears before image in the tree', () => {
    const bg = <View testID="bg-element" />;
    const { toJSON } = render(<Page {...defaultProps} background={bg} />);
    const root = toJSON();
    // First child should be the absoluteFill wrapper containing the background
    const bgWrapper = root.children[0];
    expect(bgWrapper.children[0].props.testID).toBe('bg-element');
    // Second child should be the image container
    const imageContainer = root.children[1];
    expect(imageContainer.children[0].props.testID).toBe('test-image');
  });
});
