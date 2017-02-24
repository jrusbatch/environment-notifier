import fontColorContrast from 'font-color-contrast';

export default class ColorHelper {
  getFontColor(backgroundColor) {
    if (!backgroundColor) {
      return '#000000';
    }

    return backgroundColor.includes(',')
      ? fontColorContrast(backgroundColor.split(',').slice(0, 3).map(x => x.replace(/\D*/, '')))
      : fontColorContrast(backgroundColor);
  }
}
