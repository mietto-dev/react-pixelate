import React from "react";
import { PixelateProps } from "./pixelate.types";

/**
 * Renders a pixelated version of an image using HTML Canvas
 */
const Pixelate: React.FC<PixelateProps> = ({
  src,
  width,
  height,
  pixelSize,
  centered = true,
  fillTransparencyColor,
}: PixelateProps) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const canvas = React.useRef(document.createElement("canvas"));
  const img = React.useRef(document.createElement("img"));

  React.useEffect(() => {
    loadImage();
  }, []);

  React.useEffect(() => {
    if (imgLoaded) {
      const ctx = canvas.current.getContext("2d");

      // width and height override
      img.current.width = width ? width : img.current.width;
      canvas.current.width = width ? width : img.current.width;
      img.current.height = height ? height : img.current.height;
      canvas.current.height = height ? height : img.current.height;

      if (!width) {
        canvas.current.style.width = "100%";
        img.current.style.width = "100%";
      }
      if (!height) {
        canvas.current.style.height = "100%";
        img.current.style.height = "100%";
      }

      if (ctx) {
        // we paint the image into the canvas
        // this is needed to get RGBA info out of each pixel
        ctx.drawImage(img.current, 0, 0, img.current.width, img.current.height);
        paintPixels(ctx);
      }
    }
  }, [imgLoaded]);

  const loadImage = () => {
    // create img that will be later painted into the canvas
    let imgLoad = new Image();
    imgLoad.crossOrigin = "anonymous";
    imgLoad.src = src;

    // once image is loaded..
    imgLoad.onload = () => {
      img.current = imgLoad;
      setImgLoaded(true);
    };
  };

  // TODO add effect to recompute pixel size in case image size changes
  const paintPixels = (ctx: CanvasRenderingContext2D) => {
    const calcPixel =
      pixelSize ||
      getRelativePixelSize(canvas.current.parentElement.clientWidth);

    if (!isNaN(calcPixel) && calcPixel > 0) {
      for (let x = 0; x < img.current.width + calcPixel; x += calcPixel) {
        for (let y = 0; y < img.current.height + calcPixel; y += calcPixel) {
          let xColorPick = x;
          let yColorPick = y;

          if (x >= img.current.width) {
            xColorPick =
              x - (calcPixel - (img.current.width % calcPixel) / 2) + 1;
          }
          if (y >= img.current.height) {
            yColorPick =
              y - (calcPixel - (img.current.height % calcPixel) / 2) + 1;
          }

          const rgba = ctx.getImageData(xColorPick, yColorPick, 1, 1).data;
          // TODO: add support for png transparent background
          // need to create another canvas and duplicate process?
          // one canvas to get the data from
          // one to paint pixels into
          ctx.fillStyle =
            rgba[3] === 0
              ? fillTransparencyColor
              : `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;

          if (centered) {
            ctx.fillRect(
              x - (calcPixel - (img.current.width % calcPixel) / 2),
              y - (calcPixel - (img.current.height % calcPixel) / 2),
              calcPixel,
              calcPixel
            );
          } else {
            ctx.fillRect(x, y, calcPixel, calcPixel);
          }
        }
      }
    }
  };

  const getRelativePixelSize = (width: number) => {
    return width >= 600 ? 10 : width >= 400 ? 15 : width >= 200 ? 20 : 25;
  };

  // convert this to <img src=canvas.toDataURL() /> so that we can chain SVG effects afterwards
  // transfer image-filter logic here
  return <canvas ref={canvas} />;
};

export { Pixelate };
