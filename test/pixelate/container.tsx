import React from "react";
import { Pixelate } from "../../src/pixelate/pixelate";
import src from "./image.jpg";

export const PixelateContainer = ({ width = 200, height = 200 }) => {
  return (
    <div style={{ width, height }}>
      <Pixelate src={src} />
    </div>
  );
};
