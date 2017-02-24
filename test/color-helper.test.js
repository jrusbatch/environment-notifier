import 'jest'
import ColorHelper from '../src/color-helper';

describe('getFontColor', () => {
  test('should use #000000 for no value', () => {
    const result = new ColorHelper().getFontColor(undefined);

    expect(result).toBe('#000000');
  });

  test('rgb(0, 0, 0) should return #ffffff', () => {
    const result = new ColorHelper().getFontColor('rgb(0, 0, 0)');

    expect(result).toBe('#ffffff');
  });

  test('rgb(255, 255, 255) should return #000000', () => {
    const result = new ColorHelper().getFontColor('rgb(255, 255, 255)');

    expect(result).toBe('#000000');
  });

  test('rgba(0, 0, 0, 1) should return #ffffff', () => {
    const result = new ColorHelper().getFontColor('rgba(0, 0, 0, 1)');

    expect(result).toBe('#ffffff');
  });

  test('rgba(255, 255, 255, 1) should return #000000', () => {
    const result = new ColorHelper().getFontColor('rgba(255, 255, 255, 1)');

    expect(result).toBe('#000000');
  });
});
