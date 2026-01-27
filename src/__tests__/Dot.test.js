import React from 'react';
import { render } from '@testing-library/react-native';

import Dot from '../Dot';

describe('Dot', () => {
  it('renders selected dot on dark background with white color', () => {
    const { toJSON } = render(<Dot isLight={false} selected={true} />);
    const dot = toJSON();
    expect(dot.props.style.backgroundColor).toBe('#fff');
  });

  it('renders unselected dot on dark background with semi-transparent white', () => {
    const { toJSON } = render(<Dot isLight={false} selected={false} />);
    const dot = toJSON();
    expect(dot.props.style.backgroundColor).toBe('rgba(255, 255, 255, 0.5)');
  });

  it('renders selected dot on light background with dark color', () => {
    const { toJSON } = render(<Dot isLight={true} selected={true} />);
    const dot = toJSON();
    expect(dot.props.style.backgroundColor).toBe('rgba(0, 0, 0, 0.8)');
  });

  it('renders unselected dot on light background with semi-transparent dark', () => {
    const { toJSON } = render(<Dot isLight={true} selected={false} />);
    const dot = toJSON();
    expect(dot.props.style.backgroundColor).toBe('rgba(0, 0, 0, 0.3)');
  });
});
