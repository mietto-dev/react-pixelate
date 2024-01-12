import React from "react";

const Pixelify: React.FC<{
  src: string;
  width: string;
  height: string;
  pixelSize: string;
  centered: boolean;
  fillTransparencyColor: string;
}> = ({
  src,
  width = "100%",
  height,
  pixelSize,
  centered = true,
  fillTransparencyColor,
}) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const canvas = React.useRef(document.createElement("canvas"));
  const img = React.useRef(document.createElement("img"));

  const pixelify = () => {
    // create img that will be later painted into the canvas
    let imgLoad = new Image();
    imgLoad.crossOrigin = "anonymous";
    imgLoad.src = src;

    // once image is loaded..
    imgLoad.onload = () => {
      setImgLoaded(true);
    };
  };

  const paintPixels = (ctx: CanvasRenderingContext2D) => {
    let pixelSizeN = 4;

    try {
      pixelSizeN = parseInt(pixelSize);
    } catch (err) {
      console.error("pixelSize must be a number!");
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
      if (typeof width === "string") {
        canvas.current.style.width = width;
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
    pixelify();
  }, []);

  return <canvas ref={canvas} />;
};

// class Pixelify extends Component {
//   canvas = null;
//   componentDidMount() {
//     this.pixelify(this.props);
//   }
//   componentDidUpdate() {
//     this.pixelify(this.props);
//   }
//   pixelify({ src, width, height, pixelSize, centered, fillTransparencyColor }) {
//     pixelSize = parseInt(pixelSize, 10);
//     // create img that will be later painted into the canvas
//     let img = new Image();
//     img.current.crossOrigin = "anonymous";
//     img.current.src = src;
//     // once image is loaded..
//     img.current.onload = () => {
//       const canvas = this.canvas;
//       const ctx = canvas.getContext("2d");
//       img.current.width = width ? width : img.current.width;
//       img.current.height = height ? height : img.current.height;
//       canvas.width = img.current.width;
//       canvas.height = img.current.height;
//       // we paint the image into the canvas
//       // this is needed to get RGBA info out of each pixel
//       ctx.drawImage(img, 0, 0, img.current.width, img.current.height);
//       this.paintPixels(ctx, img, pixelSize, centered, fillTransparencyColor);
//       img = null;
//     };
//   }
//   paintPixels(ctx, img, pixelSize, centered, fillTransparencyColor) {
//     if (!isNaN(pixelSize) && pixelSize > 0) {
//       for (let x = 0; x < img.current.width + pixelSize; x += pixelSize) {
//         for (let y = 0; y < img.current.height + pixelSize; y += pixelSize) {
//           let xColorPick = x;
//           let yColorPick = y;

//           if (x >= img.current.width) {
//             xColorPick =
//               x - (pixelSize - (img.current.width % pixelSize) / 2) + 1;
//           }
//           if (y >= img.current.height) {
//             yColorPick =
//               y - (pixelSize - (img.current.height % pixelSize) / 2) + 1;
//           }

//           const rgba = ctx.getImageData(xColorPick, yColorPick, 1, 1).data;
//           // TODO: add support for png transparent background
//           // need to create another canvas and duplicate process?
//           // one canvas to get the data from
//           // one to paint pixels into
//           ctx.fillStyle =
//             rgba[3] === 0
//               ? fillTransparencyColor
//               : `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;

//           if (centered) {
//             ctx.fillRect(
//               parseInt(
//                 x - (pixelSize - (img.current.width % pixelSize) / 2),
//                 10
//               ),
//               parseInt(
//                 y - (pixelSize - (img.current.height % pixelSize) / 2),
//                 10
//               ),
//               pixelSize,
//               pixelSize
//             );
//           } else {
//             ctx.fillRect(x, y, pixelSize, pixelSize);
//           }
//         }
//       }
//     }
//   }
//   render() {
//     return (
//       <canvas
//         ref={(canvas) => {
//           this.canvas = canvas;
//         }}
//       />
//     );
//   }
// }

// Pixelify.propTypes = {
//   src: PropTypes.string.isRequired,
//   pixelSize: PropTypes.number,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   centered: PropTypes.bool,
//   fillTransparencyColor: PropTypes.string,
// };

// Pixelify.defaultProps = {
//   centered: false,
//   fillTransparencyColor: "white",
// };

export { Pixelify as Pixelify2 };
