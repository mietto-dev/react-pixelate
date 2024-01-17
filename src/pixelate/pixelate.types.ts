/**
 * Pixelate component props
 * @property {string} src - The imported image / path
 * @property {number} width - Image specific width in pixels (defaults to 100% of parent container)
 * @property {number} height - Image specific height in pixels (defaults to 100% of parent container)
 * @property {number} pixelSize - Pixel size in the new pixelated image (defaults to 10 - 25 range, depending on image width)
 * @interface
 */
export interface PixelateProps {
  src: string;
  width?: number;
  height?: number;
  pixelSize?: number;
  centered?: boolean;
  fillTransparencyColor?: string;
}
