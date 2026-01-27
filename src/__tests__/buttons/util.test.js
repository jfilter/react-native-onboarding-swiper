import { BUTTON_SIZE, getDefaultStyle, MARGIN_RIGHT, MARGIN_LEFT } from '../../buttons/util';

describe('buttons/util', () => {
  it('exports BUTTON_SIZE as 40', () => {
    expect(BUTTON_SIZE).toBe(40);
  });

  it('returns dark color for light background', () => {
    const style = getDefaultStyle(true);
    expect(style.color).toBe('rgba(0, 0, 0, 0.8)');
  });

  it('returns white color for dark background', () => {
    const style = getDefaultStyle(false);
    expect(style.color).toBe('#fff');
  });
});
