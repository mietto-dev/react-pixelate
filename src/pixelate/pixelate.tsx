import React from "react";
import { PixelateProps } from "./pixelate.types";

const Pixelate: React.FC<PixelateProps> = ({
  src,
  width = "100%",
  height = "100%",
  pixelSize = 8,
  centered = true,
  fillTransparencyColor,
}) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const canvas = React.useRef(document.createElement("canvas"));
  const img = React.useRef(document.createElement("img"));

  const process = () => {
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

  const paintPixels = (ctx) => {
    let pixelSizeN = 4;

    try {
      pixelSizeN = parseInt(String(pixelSize));
    } catch (err) {
      console.error("pixelSize must be a number!");
    }

    if (typeof width === "string" && width.endsWith("%")) {
      pixelSizeN = Math.round(canvas.current.parentElement.clientWidth / 10);
    }

    if (!isNaN(pixelSizeN) && pixelSizeN > 0) {
      for (let x = 0; x < img.current.width + pixelSizeN; x += pixelSizeN) {
        for (let y = 0; y < img.current.height + pixelSizeN; y += pixelSizeN) {
          let xColorPick = x;
          let yColorPick = y;

          if (x >= img.current.width) {
            xColorPick =
              x - (pixelSizeN - (img.current.width % pixelSizeN) / 2) + 1;
          }
          if (y >= img.current.height) {
            yColorPick =
              y - (pixelSizeN - (img.current.height % pixelSizeN) / 2) + 1;
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
              // parseInt(
              x - (pixelSizeN - (img.current.width % pixelSizeN) / 2),
              // ),
              // parseInt(
              y - (pixelSizeN - (img.current.height % pixelSizeN) / 2),
              // ),
              pixelSizeN,
              pixelSizeN
            );
          } else {
            ctx.fillRect(x, y, pixelSizeN, pixelSizeN);
          }
        }
      }
    }
  };

  React.useEffect(() => {
    if (imgLoaded) {
      const canvasX = canvas.current;
      const ctx = canvasX.getContext("2d");

      img.current.width = typeof width === "number" ? width : img.current.width;
      img.current.height =
        typeof height === "number" ? height : img.current.height;

      canvas.current.width = img.current.width;
      canvas.current.height = img.current.height;

      if (typeof width === "string" && width.endsWith("%")) {
        canvas.current.style.width = width;
        img.current.style.width = width;
      }
      if (typeof height === "string" && height.endsWith("%")) {
        canvas.current.style.height = height;
        img.current.style.height = height;
      }

      if (ctx) {
        // we paint the image into the canvas
        // this is needed to get RGBA info out of each pixel
        ctx.drawImage(img.current, 0, 0, img.current.width, img.current.height);
        paintPixels(ctx);
        img.current = document.createElement("img");
      }
    }
  }, [imgLoaded]);

  React.useEffect(() => {
    process();
  }, []);

  return (
    <>
      <div
        className="img-container"
        style={{ width: "200px", height: "170px" }}
      >
        <canvas ref={canvas} />
      </div>
    </>
  );
};

export { Pixelate };
